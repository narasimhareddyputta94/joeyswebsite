import Link from "next/link";
import { Map, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Sitemap — Cumberland Brooks, LLC",
  description: "Find any page on our website.",
};

export default function SitemapPage() {
  const sections = [
    {
      h: "Company",
      links: [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/results", label: "Results" },
        { href: "/contact", label: "Contact" },
        { href: "/faq", label: "FAQ" },
      ],
    },
    {
      h: "Services",
      links: [
        { href: "/services", label: "All Services" },
        { href: "/services/property-tax", label: "Property Tax Appeals" },
        { href: "/services/medical-bills", label: "Medical Bills & Healthcare" },
        { href: "/services/collections", label: "Debt & Collections" },
        { href: "/services/contracts", label: "Contracts & Commercial" },
        { href: "/services/real-estate", label: "Real Estate & Leasing" },
        { href: "/services/mediation", label: "Mediation & Dispute Resolution" },
        { href: "/services/compliance", label: "Regulatory & Compliance" },
      ],
    },
    {
      h: "Legal",
      links: [
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
        { href: "/accessibility", label: "Accessibility" },
        { href: "/disclaimer", label: "Disclaimer" },
        { href: "/compliance", label: "Compliance" },
      ],
    },
  ];

  return (
    <main className="bg-gradient-to-b from-white to-slate-50 text-slate-800">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(79,70,229,0.2),transparent)]" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200">
            <Map className="h-4 w-4" /> Quick navigation
          </p>
          <h1 className="mt-3 font-serif text-4xl text-slate-900 md:text-5xl">Sitemap</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Explore the full site at a glance. Looking for something specific? Try our Services hub.
          </p>
        </div>
      </section>

      {/* LISTS */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((s, idx) => (
            <div key={idx} className="rounded-2xl border bg-white p-5">
              <p className="font-medium text-slate-900">{s.h}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {s.links.map((l) => (
                  <li key={l.href}>
                    <Link className="group inline-flex items-center gap-1 text-slate-700 hover:text-slate-900" href={l.href}>
                      {l.label}
                      <ChevronRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border bg-white p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-indigo-600">Start with clarity</p>
              <h3 className="font-serif text-2xl text-slate-900">Not sure where to begin?</h3>
              <p className="text-slate-600">Tell us your scenario and we’ll point you to the right path.</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border bg-slate-900 px-5 py-2 text-white hover:bg-slate-800"
            >
              Talk to a specialist
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
