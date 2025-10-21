import Link from "next/link";
import { Scale, FileText, ShieldCheck, Ban, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Terms of Use — Cumberland Brooks, LLC",
  description: "Terms and conditions for using this website and our services.",
};

const Row = ({ h, d, icon }: { h: string; d: string; icon: React.ReactNode }) => (
  <div className="rounded-2xl border bg-white p-5">
    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">{icon}</div>
    <p className="mt-3 font-medium text-slate-900">{h}</p>
    <p className="mt-2 text-sm text-slate-600">{d}</p>
  </div>
);

export default function TermsPage() {
  return (
    <main className="bg-gradient-to-b from-white to-slate-50 text-slate-800">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_70%_at_20%_-10%,rgba(79,70,229,0.22),transparent),radial-gradient(60%_60%_at_90%_10%,rgba(99,102,241,0.18),transparent)]" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200">
            <Scale className="h-4 w-4" /> Plain-language terms
          </p>
          <h1 className="mt-3 font-serif text-4xl text-slate-900 md:text-5xl">Terms of Use</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            By using this site, you agree to these terms. If you don’t agree, please don’t use the site.
          </p>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          <Row h="No legal advice" d="Site content is general information—not legal advice." icon={<FileText />} />
          <Row h="No relationship formed" d="Engagements require a written agreement." icon={<ShieldCheck />} />
          <Row h="Use & liability" d="Provided 'as is' without warranties or guarantee of outcomes." icon={<Scale />} />
        </div>

        {/* PRETTY LISTS */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-white p-5">
            <p className="font-serif text-lg text-slate-900">Acceptable use</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2"><Ban className="mt-0.5 h-4 w-4 text-slate-500" /> No breaking security or scraping.</li>
              <li className="flex items-start gap-2"><Ban className="mt-0.5 h-4 w-4 text-slate-500" /> Don’t infringe IP or copy content without permission.</li>
              <li className="flex items-start gap-2"><Ban className="mt-0.5 h-4 w-4 text-slate-500" /> Don’t use the site for unlawful activity.</li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <p className="font-serif text-lg text-slate-900">Changes & contact</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" /> We may update these terms from time to time.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" /> Continued site use means you accept the latest version.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" /> Questions? <Link href="/contact" className="text-indigo-600 hover:underline">Contact us</Link>.</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border bg-white p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-indigo-600">Clarity first</p>
              <h3 className="font-serif text-2xl text-slate-900">Need help understanding these terms?</h3>
              <p className="text-slate-600">We’ll explain in plain English and point you to the right resource.</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border bg-slate-900 px-5 py-2 text-white hover:bg-slate-800"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
