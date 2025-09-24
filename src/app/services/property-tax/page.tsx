"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, CheckCircle2, FileSpreadsheet, Building2, ShieldCheck, Clock4, MapPin } from "lucide-react";

export default function PropertyTaxPage() {
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

  return (
    <main className="text-slate-800">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1538688423619-a81d3f23454b?q=80&w=1600&auto=format&fit=crop"
            alt="City skyline"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_-10%,rgba(59,130,246,.25),transparent)]" />
          <div className="absolute inset-0 bg-white/60" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-14 pt-24 md:grid-cols-2 md:px-6">
          <div>
            <p className="kicker text-indigo-600">Property Tax Appeals</p>
            <h1 className="font-serif text-4xl md:text-5xl text-slate-900">Lower your assessed value. Keep more cash.</h1>
            <p className="mt-4 text-slate-700">
              We build valuation evidence and handle filings and hearings for homeowners and commercial owners.
              Most matters are success-based—if you don’t save, you don’t pay.
            </p>
            <div className="mt-6 flex gap-3">
              <Button asChild className="rounded-full px-6"><Link href="/contact">Book free consult</Link></Button>
              <Button asChild variant="outline" className="rounded-full"><Link href="/results">See results</Link></Button>
            </div>
            <p className="mt-2 text-xs text-slate-500 flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> HIPAA/PCI-aware processes • Least-privilege data access</p>
          </div>

          <div className="rounded-2xl border bg-white/80 p-6 backdrop-blur">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Scale /></div>
            <p className="font-medium text-slate-900">What we do</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" /> {b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Card key={i}><CardContent className="p-6">
                <p className="text-sm text-slate-500">Step {i+1}</p>
                <p className="mt-1 font-serif text-xl text-slate-900">{s.t}</p>
                <p className="mt-2 text-slate-700">{s.d}</p>
              </CardContent></Card>
            ))}
          </div>

          {/* Docs */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card><CardContent className="p-6">
              <p className="flex items-center gap-2 font-medium text-slate-900"><FileSpreadsheet className="h-5 w-5 text-indigo-600" /> What we’ll ask for</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">{docs.map((d,i)=><li key={i} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600"/>{d}</li>)}</ul>
            </CardContent></Card>
            <Card><CardContent className="p-6">
              <p className="flex items-center gap-2 font-medium text-slate-900"><Building2 className="h-5 w-5 text-indigo-600" /> Typical timelines</p>
              <p className="mt-2 text-slate-700">Most appeals resolve in one season. Commercial parcels with board hearings may take longer. We keep you updated at every milestone.</p>
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-600"><Clock4 className="h-4 w-4" /> Fast-track available where deadlines allow.</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-slate-600"><MapPin className="h-4 w-4" /> Coverage across multiple U.S. markets.</p>
            </CardContent></Card>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild className="rounded-full"><Link href="/contact">Start my appeal</Link></Button>
            <Button asChild variant="outline" className="rounded-full"><Link href="/">Try the savings estimator</Link></Button>
          </div>
        </div>
      </section>
    </main>
  );
}
