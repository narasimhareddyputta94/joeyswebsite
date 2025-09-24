"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, CheckCircle2, ShieldCheck, FileText, Pill, ClipboardList, Clock4 } from "lucide-react";

export default function MedicalBillsPage() {
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

  return (
    <main className="text-slate-800">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1600&auto=format&fit=crop" alt="Hospital" fill className="object-cover opacity-30"/>
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_-10%,rgba(59,130,246,.25),transparent)]" />
          <div className="absolute inset-0 bg-white/60" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-14 pt-24 md:grid-cols-2 md:px-6">
          <div>
            <p className="kicker text-indigo-600">Medical Bills & Healthcare</p>
            <h1 className="font-serif text-4xl md:text-5xl text-slate-900">Stop overcharges. Get fair healthcare bills.</h1>
            <p className="mt-4 text-slate-700">We audit statements, fight coding errors, and negotiate real reductions—often 30–60%+. No pressure, clear outcomes.</p>
            <div className="mt-6 flex gap-3">
              <Button asChild className="rounded-full px-6"><Link href="/contact">Free bill audit</Link></Button>
              <Button asChild variant="outline" className="rounded-full"><Link href="/results">See results</Link></Button>
            </div>
            <p className="mt-2 text-xs text-slate-500 flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> HIPAA-aware workflows • Encrypted intake</p>
          </div>

          <div className="rounded-2xl border bg-white/80 p-6 backdrop-blur">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Stethoscope /></div>
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
              <p className="flex items-center gap-2 font-medium text-slate-900"><ClipboardList className="h-5 w-5 text-indigo-600" /> What to upload</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">{docs.map((d,i)=><li key={i} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600"/>{d}</li>)}</ul>
            </CardContent></Card>
            <Card><CardContent className="p-6">
              <p className="flex items-center gap-2 font-medium text-slate-900"><FileText className="h-5 w-5 text-indigo-600" /> Typical outcomes</p>
              <p className="mt-2 text-slate-700">Coding fixes, charity care routing, interest/fee waivers, and realistic plans that preserve credit profiles.</p>
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-600"><Pill className="h-4 w-4" /> We never ask you to skip critical care.</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-slate-600"><Clock4 className="h-4 w-4" /> Many files resolve in weeks.</p>
            </CardContent></Card>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild className="rounded-full"><Link href="/contact">Start my audit</Link></Button>
            <Button asChild variant="outline" className="rounded-full"><Link href="/">Try the estimator</Link></Button>
          </div>
        </div>
      </section>
    </main>
  );
}
