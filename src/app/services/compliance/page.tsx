"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, CheckCircle2, Clock4 } from "lucide-react";

export default function ComplianceServicePage() {
  const TITLE = "Regulatory & Compliance";
  const SUB = "Policy design, audits and training that keep your organization safe.";
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
    { t: "Implement", d: "We deliver policies, training and workflows." },
    { t: "Monitor", d: "Ongoing audits and updates as regs evolve." },
  ];

  return (
    <main className="text-slate-800">
      <section className="bg-gradient-to-b from-white to-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><ShieldCheck /></div>
          <h1 className="mt-3 font-serif text-4xl text-slate-900">{TITLE}</h1>
          <p className="mt-3 text-lg text-slate-700">{SUB}</p>

          <div className="mt-6 flex gap-3">
            <Button asChild className="rounded-full px-6"><Link href="/contact">Talk to a lawyer</Link></Button>
            <Button asChild variant="outline" className="rounded-full"><Link href="/results">See results</Link></Button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card><CardContent className="p-6">
              <p className="font-medium text-slate-900">Where we add value</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {bullets.map((b,i)=>(<li key={i} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600"/>{b}</li>))}
              </ul>
            </CardContent></Card>

            <Card><CardContent className="p-6">
              <p className="font-medium text-slate-900">Deliverables & pricing</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {deliverables.map((d,i)=>(<li key={i} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600"/>{d}</li>))}
              </ul>
              <p className="mt-3 flex items-center gap-2 text-sm text-slate-600"><Clock4 className="h-4 w-4" /> Typical program rollout in 3–6 weeks.</p>
            </CardContent></Card>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s,i)=>(
              <Card key={i}><CardContent className="p-6">
                <p className="text-sm text-slate-500">Step {i+1}</p>
                <p className="mt-1 font-serif text-xl text-slate-900">{s.t}</p>
                <p className="mt-2 text-slate-700">{s.d}</p>
              </CardContent></Card>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <Button asChild className="rounded-full"><Link href="/contact">Book a free consultation</Link></Button>
            <Button asChild variant="outline" className="rounded-full"><Link href="/services">All services</Link></Button>
          </div>
        </div>
      </section>
    </main>
  );
}
