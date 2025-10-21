import Link from "next/link";
import { ShieldCheck, FileCheck2, Scale, Lock, ClipboardList, Building2 } from "lucide-react";

export const metadata = {
  title: "Compliance — Cumberland Brooks, LLC",
  description: "Our approach to data protection, privacy, and ethical practice.",
};

export default function CompliancePage() {
  return (
    <main className="bg-gradient-to-b from-white to-slate-50 text-slate-800">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(79,70,229,0.22),transparent)]" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200">
            <ShieldCheck className="h-4 w-4" /> Ethics & security
          </p>
          <h1 className="mt-3 font-serif text-4xl text-slate-900 md:text-5xl">Compliance</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            We operate with transparency, informed consent, and safeguards aligned to HIPAA/PCI-aware practices.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { i: <Lock className="h-6 w-6 text-indigo-600" />, h: "Security", d: "Encryption in transit, least-privilege access, vendor diligence, audit trails." },
            { i: <FileCheck2 className="h-6 w-6 text-indigo-600" />, h: "Privacy", d: "Data minimization, purpose limitation, retention aligned to obligations." },
            { i: <Scale className="h-6 w-6 text-indigo-600" />, h: "Ethics", d: "Transparent scopes, informed consent, and jurisdiction-aware standards." },
          ].map((c, idx) => (
            <div key={idx} className="rounded-2xl border bg-white p-5">
              {c.i}
              <p className="mt-3 font-medium text-slate-900">{c.h}</p>
              <p className="mt-2 text-sm text-slate-600">{c.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-white p-5">
            <p className="font-serif text-lg text-slate-900">Data requests</p>
            <p className="mt-2 text-sm text-slate-600">
              To request access or deletion (where permitted), reach us via <Link href="/contact" className="text-indigo-600 hover:underline">Contact</Link>.
            </p>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <p className="font-serif text-lg text-slate-900">Incidents</p>
            <p className="mt-2 text-sm text-slate-600">
              We investigate and communicate material incidents consistent with law and contractual duties.
            </p>
          </div>
        </div>

        {/* CTA ROW */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-slate-900 p-6 text-slate-100">
            <div className="flex items-center gap-2 text-indigo-200"><ClipboardList className="h-5 w-5" /><p>Documentation</p></div>
            <h3 className="mt-1 font-serif text-2xl">Need a compliance letter?</h3>
            <p className="mt-2 text-slate-300">We’ll provide written details of our safeguards and workflows.</p>
            <Link href="/contact" className="mt-4 inline-flex rounded-full bg-white px-5 py-2 text-slate-900 hover:bg-slate-100">Request documentation</Link>
          </div>
          <div className="rounded-2xl border bg-white p-6">
            <div className="flex items-center gap-2 text-indigo-600"><Building2 className="h-5 w-5" /><p>For enterprise</p></div>
            <h3 className="mt-1 font-serif text-2xl text-slate-900">Vendor diligence made simple</h3>
            <p className="mt-2 text-slate-600">We can complete your security questionnaire and sign NDAs as needed.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
