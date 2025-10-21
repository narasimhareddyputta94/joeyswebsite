import Link from "next/link";
import { Info, CheckCircle2, ShieldCheck, FileText } from "lucide-react";

export const metadata = {
  title: "Disclaimer — Cumberland Brooks, LLC",
  description: "Important information about results and site content.",
};

export default function DisclaimerPage() {
  return (
    <main className="bg-gradient-to-b from-white to-slate-50 text-slate-800">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(79,70,229,0.2),transparent)]" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200">
            <Info className="h-4 w-4" /> Clear expectations
          </p>
          <h1 className="mt-3 font-serif text-4xl text-slate-900 md:text-5xl">Disclaimer</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            We’re transparent about what our site and examples can—and cannot—promise.
          </p>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5">
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            <p className="mt-3 font-medium text-slate-900">Illustrative results</p>
            <p className="mt-2 text-sm text-slate-600">Every matter is unique. Outcomes vary and aren’t guaranteed.</p>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <ShieldCheck className="h-6 w-6 text-indigo-600" />
            <p className="mt-3 font-medium text-slate-900">No legal advice</p>
            <p className="mt-2 text-sm text-slate-600">Site content is general information only.</p>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <FileText className="h-6 w-6 text-slate-700" />
            <p className="mt-3 font-medium text-slate-900">Engagement required</p>
            <p className="mt-2 text-sm text-slate-600">Services require a written agreement and conflict checks.</p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border bg-white p-6">
          <p className="font-serif text-lg text-slate-900">Questions</p>
          <p className="mt-2 text-sm text-slate-600">
            We’re happy to explain any example or page in more detail.{" "}
            <Link href="/contact" className="text-indigo-600 hover:underline">Contact us</Link> for straight answers.
          </p>
        </div>
      </section>
    </main>
  );
}
