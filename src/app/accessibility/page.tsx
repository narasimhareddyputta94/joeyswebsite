import Link from "next/link";
import { Accessibility, Keyboard, Eye, Volume2, Smartphone } from "lucide-react";

export const metadata = {
  title: "Accessibility — Cumberland Brooks, LLC",
  description: "Our commitment to an inclusive, accessible experience.",
};

export default function AccessibilityPage() {
  return (
    <main className="bg-gradient-to-b from-white to-slate-50 text-slate-800">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(79,70,229,0.23),transparent)]" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200">
            <Accessibility className="h-4 w-4" /> WCAG-minded design
          </p>
          <h1 className="mt-3 font-serif text-4xl text-slate-900 md:text-5xl">Accessibility</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            We strive for WCAG 2.1 AA—keyboard access, clear semantics, and readable contrast.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <div className="grid gap-6 md:grid-cols-5">
          {[
            { i: <Keyboard />, h: "Keyboard friendly", d: "Logical focus order, visible focus states." },
            { i: <Eye />, h: "Readable contrast", d: "Colors tested for clarity and legibility." },
            { i: <Smartphone />, h: "Responsive", d: "Mobile-first layouts with large tap targets." },
            { i: <Volume2 />, h: "Prefer text", d: "Information isn’t locked in media alone." },
            { i: <Accessibility />, h: "Assistive tech", d: "Semantic HTML and helpful ARIA where needed." },
          ].map((c, idx) => (
            <div key={idx} className="rounded-2xl border bg-white p-5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">{c.i}</div>
              <p className="mt-3 font-medium text-slate-900">{c.h}</p>
              <p className="mt-2 text-sm text-slate-600">{c.d}</p>
            </div>
          ))}
        </div>

        {/* FEEDBACK CARD */}
        <div className="mt-10 rounded-2xl border bg-white p-6">
          <p className="font-serif text-lg text-slate-900">Report a barrier</p>
          <p className="mt-2 text-sm text-slate-600">
            If you encounter an issue, please <Link href="/contact" className="text-indigo-600 hover:underline">let us know</Link> with the page URL,
            problem description, and tools you’re using. We’ll review quickly.
          </p>
        </div>
      </section>
    </main>
  );
}
