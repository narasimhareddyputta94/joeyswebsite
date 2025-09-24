"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  CheckCircle2,
  Clock4,
  FileText,
  BookOpenCheck,
  Lock,
  ShieldAlert,
  BadgeCheck,
  Building2,
  Users2,
  ArrowRight,
} from "lucide-react";

export default function ComplianceServicePage() {
  const TITLE = "Regulatory & Compliance";
  const SUB = "Policy design, audits, and training that keep your organization safe—and inspection-ready.";

  const bullets = [
    "Privacy & data protection programs (HIPAA/PCI-aware)",
    "Employee handbooks, codes of conduct & training",
    "Incident response playbooks & vendor risk reviews",
    "Regulatory filings and consent management",
  ];

  const deliverables = [
    "Policy suites and template libraries",
    "Practical training decks and checklists",
    "Quarterly audits & remediation plans",
  ];

  const steps = [
    { t: "Assess", d: "Gap assessment against applicable frameworks." },
    { t: "Implement", d: "We deliver policies, training, and operational workflows." },
    { t: "Monitor", d: "Ongoing audits and updates as regulations evolve." },
  ];

  const faqs = [
    {
      q: "Which frameworks do you support?",
      a: "HIPAA, PCI awareness, GLBA, state privacy acts, and general internal controls. We tailor to mixed environments and layered vendor stacks.",
    },
    {
      q: "Do you run live trainings?",
      a: "Yes. We provide live and recorded sessions, plus micro-quizzes and sign-off tracking for audit trails.",
    },
    {
      q: "How long does rollout take?",
      a: "Lightweight programs launch in 3–6 weeks. Enterprise programs vary by number of departments and vendors.",
    },
    {
      q: "How do you price?",
      a: "Clear flat-fee scopes for assessments and policy suites, with monthly options for audits and refresh cycles.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="text-slate-800">
      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden">
        {/* subtle background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-emerald-50" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-14 pt-20 md:grid-cols-12 md:px-6">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-600/20">
              <ShieldCheck className="h-4 w-4" />
              Zero-surprise compliance, built for operations
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

            {/* trust stats */}
            <div className="mt-6 grid max-w-xl grid-cols-3 gap-4">
              <Stat k="3–6 wks" t="typical rollout" />
              <Stat k="Quarterly" t="audit cadence" />
              <Stat k="100%" t="policy sign-off tracking" />
            </div>
          </div>

          {/* right-hand quick value panel */}
          <div className="md:col-span-5">
            <Card className="border-indigo-100 shadow-sm">
              <CardContent className="p-6">
                <p className="flex items-center gap-2 text-sm font-medium text-slate-900">
                  <BookOpenCheck className="h-5 w-5 text-indigo-600" />
                  What you get
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <Lock className="h-4 w-4" />
                  HIPAA/PCI-aware workflows • Least-privilege doc sharing • Audit-ready artifacts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* credibility strip just under the hero */}
        <div className="border-t bg-white/80 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-3 text-sm text-slate-700 sm:grid-cols-3 md:px-6">
            <Cred icon={<BadgeCheck className="h-4 w-4 text-emerald-600" />} h="Written policies & logs" d="Real artifacts for regulators and partners." />
            <Cred icon={<ShieldAlert className="h-4 w-4 text-rose-600" />} h="Incident playbooks" d="Escalation trees, roles, and comms templates." />
            <Cred icon={<Users2 className="h-4 w-4 text-indigo-600" />} h="Training that sticks" d="Short, role-based sessions + sign-offs." />
          </div>
        </div>
      </section>

      {/* ================= VALUE & DELIVERABLES ================= */}
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
                  <Clock4 className="h-4 w-4" /> Typical program rollout in 3–6 weeks.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* packages (non-binding, just to guide) */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-wide text-indigo-600">Starter</p>
                <p className="mt-1 font-serif text-xl text-slate-900">Policy Essentials</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Core policy suite
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> 1× training + sign-off
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Vendor checklist
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="ring-1 ring-indigo-200 transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-wide text-indigo-600">Most Popular</p>
                <p className="mt-1 font-serif text-xl text-slate-900">Operate with Confidence</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> All Starter features
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Incident playbook & drills
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Quarterly audits & reports
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-wide text-indigo-600">Enterprise</p>
                <p className="mt-1 font-serif text-xl text-slate-900">Regulatory Partner</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Multi-dept rollout
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Vendor risk review program
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> On-call counsel & updates
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* industries */}
          <div className="mt-10 rounded-2xl border bg-white p-6">
            <p className="flex items-center gap-2 text-sm font-medium text-slate-900">
              <Building2 className="h-5 w-5 text-indigo-600" />
              Industries we support
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-700">
              {["Healthcare", "Professional Services", "Fintech", "Real Estate", "Nonprofit", "SMB SaaS"].map(
                (i) => (
                  <span
                    key={i}
                    className="rounded-full border bg-slate-50 px-3 py-1"
                  >
                    {i}
                  </span>
                )
              )}
            </div>
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

      {/* ================= PROCESS ================= */}
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

      {/* ================= FAQ ================= */}
      <section className="bg-gradient-to-b from-white to-slate-50 pb-16 pt-10">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl text-slate-900">Frequently asked</h2>
            <p className="mt-2 text-slate-600">Clear answers to help you move quickly and safely.</p>
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
              <Link href="/contact">Start your program</Link>
            </Button>
          </div>
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
              <h3 className="mt-1 font-serif text-3xl">Compliance that works in the real world.</h3>
              <p className="mt-2 max-w-2xl text-slate-200">
                We’ll map your risk, install practical controls, and keep your team trained—without slowing down the business.
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
                  <FileText className="h-4 w-4" /> Policy artifacts • <Users2 className="h-4 w-4" /> Training sign-offs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* --------------- tiny helpers --------------- */
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
    <div className="flex items-start gap-3 rounded-xl border bg-white px-4 py-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="font-medium text-slate-900">{h}</p>
        <p className="text-sm text-slate-600">{d}</p>
      </div>
    </div>
  );
}
