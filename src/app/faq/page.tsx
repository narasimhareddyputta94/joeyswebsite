"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  { q: "Do I pay anything upfront?", a: "No. We charge a success-based fee only from realized savings." },
  { q: "What if you don’t save me money?", a: "Then you owe us nothing. We align our incentives to your outcome." },
  { q: "How long do appeals take?", a: "Typically weeks to a few months depending on jurisdiction and docket." },
  { q: "Residential vs commercial—do you do both?", a: "Yes. We have analysts focused on each asset type." },
  { q: "Is my data secure?", a: "We use encrypted intake, least-privilege access, and HIPAA/PCI-aware workflows." },
  { q: "Can you work nationwide?", a: "We cover most U.S. markets directly or via partner counsel where required." },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <div className="mx-auto max-w-xl text-center">
        <p className="kicker text-indigo-600">FAQ</p>
        <h1 className="font-serif text-4xl text-slate-900">Answers, upfront</h1>
        <p className="mt-3 text-slate-600">If you don’t see your question, contact us—we’ll help right away.</p>
      </div>

      <div className="mt-8 space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="overflow-hidden rounded-xl border bg-white">
              <button className="flex w-full items-center justify-between px-4 py-4 text-left" onClick={() => setOpen(isOpen ? null : i)}>
                <span className="font-medium text-slate-900">{f.q}</span>
                {isOpen ? <Minus className="h-5 w-5 text-slate-500" /> : <Plus className="h-5 w-5 text-slate-500" />}
              </button>
              {isOpen && <div className="px-4 pb-4 text-slate-600">{f.a}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
