"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gavel, CheckCircle2, ShieldAlert, FileWarning, Scale, Clock4 } from "lucide-react";

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

  return (
    <main className="text-slate-800">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop" alt="Gavel" fill className="object-cover opacity-30"/>
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_-10%,rgba(59,130,246,.25),transparent)]" />
          <div className="absolute inset-0 bg-white/60" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-14 pt-24 md:grid-cols-2 md:px-6">
          <div>
            <p className="kicker text-indigo-600">Debt & Collections Defense</p>
            <h1 className="font-serif text-4xl md:text-5xl text-slate-900">Clamp down on collectors. Fix the record.</h1>
            <p className="mt-4 text-slate-700">We challenge unlawful practices, negotiate realistic outcomes, and guide credit corrections.</p>
            <div className="mt-6 flex gap-3">
              <Button asChild className="rounded-full px-6"><Link href="/contact">Free case review</Link></Button>
              <Button asChild variant="outline" className="rounded-full"><Link href="/results">See results</Link></Button>
            </div>
            <p className="mt-2 text-xs text-slate-500 flex items-center gap-2"><ShieldAlert className="h-4 w-4" /> Compliance-driven, ethics-first negotiations</p>
          </div>

          <div className="rounded-2xl border bg-white/80 p-6 backdrop-blur">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Gavel /></div>
            <p className="font-medium text-slate-900">What we do</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              {bullets.map((b, i) => <li key={i} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600"/>{b}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s,i)=>(
              <Card key={i}><CardContent className="p-6">
                <p className="text-sm text-slate-500">Step {i+1}</p>
                <p className="mt-1 font-serif text-xl text-slate-900">{s.t}</p>
                <p className="mt-2 text-slate-700">{s.d}</p>
              </CardContent></Card>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card><CardContent className="p-6">
              <p className="flex items-center gap-2 font-medium text-slate-900"><FileWarning className="h-5 w-5 text-indigo-600" /> Bring these</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">{docs.map((d,i)=><li key={i} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600"/>{d}</li>)}</ul>
            </CardContent></Card>
            <Card><CardContent className="p-6">
              <p className="flex items-center gap-2 font-medium text-slate-900"><Scale className="h-5 w-5 text-indigo-600" /> Outcomes & timelines</p>
              <p className="mt-2 text-slate-700">Many matters resolve in weeks. Lawsuit defense timelines vary; we set expectations early and keep spend disciplined.</p>
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-600"><Clock4 className="h-4 w-4" /> We pursue deletions/corrections when supported by law and evidence.</p>
            </CardContent></Card>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild className="rounded-full"><Link href="/contact">Start my review</Link></Button>
            <Button asChild variant="outline" className="rounded-full"><Link href="/">Try the estimator</Link></Button>
          </div>
        </div>
      </section>
    </main>
  );
}
