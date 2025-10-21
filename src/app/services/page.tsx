"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronRight, Scale, Gavel, ShieldCheck, Landmark, Building2, Briefcase, FileText,
  Handshake, Building, Users, Stethoscope, GraduationCap, ClipboardCheck,
  Hammer, Banknote, BookOpen, UserRound, ShieldAlert, ScrollText, Clock4, Sparkles, CheckCircle2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BookDrawer from "@/components/BookDrawer";

export default function ServicesPage() {
  // === Drawer (15-min Calendly) ===
  const [drawer, setDrawer] = useState(false);
  const [prefill, setPrefill] = useState<{ name?: string; email?: string; address?: string; ptype?: "residential" | "commercial" }>();

  // Listen for global "open-book" (fired by Navbar/Sticky/etc.)
  useEffect(() => {
    const handler = (e: Event) => {
      if (typeof (e as any).preventDefault === "function") (e as any).preventDefault();
      const detail = (e as CustomEvent).detail as typeof prefill | undefined;
      if (detail) setPrefill(detail);
      setDrawer(true);
    };
    window.addEventListener("open-book", handler as EventListener);
    return () => window.removeEventListener("open-book", handler as EventListener);
  }, []);

  // === Quick Links (all service pages) ===
  const quickLinks = [
    { href: "/services/property-tax", label: "Property Tax Appeals" },
    { href: "/services/medical-bills", label: "Medical Bills" },
    { href: "/services/collections", label: "Debt & Collections" },
    { href: "/services/business", label: "Business Counsel" },
    { href: "/services/contracts", label: "Contracts" },
    { href: "/services/real-estate", label: "Real Estate" },
    { href: "/services/mediation", label: "Mediation" },
    { href: "/services/compliance", label: "Compliance" },
  ];

  const featured = [
    {
      href: "/services/property-tax",
      icon: <Scale className="h-6 w-6" />,
      title: "Property Tax Appeals",
      blurb: "Lower assessments for residential & commercial property. Pay only from realized savings.",
    },
    {
      href: "/services/medical-bills",
      icon: <Stethoscope className="h-6 w-6" />,
      title: "Medical Bills & Healthcare",
      blurb: "Audit errors, correct miscoding, and negotiate balances with providers/payers.",
    },
    {
      href: "/services/collections",
      icon: <Gavel className="h-6 w-6" />,
      title: "Debt & Collections Defense",
      blurb: "Dispute inaccuracies, curb fee stacking, and negotiate realistic outcomes.",
    },
  ];

  const fullCatalog = [
    { icon: <Briefcase className="h-5 w-5" />, t: "Business & Startups", d: "Entity formation, operating agreements, cap tables, governance.", link: "/services/business" },
    { icon: <FileText className="h-5 w-5" />, t: "Contracts & Negotiation", d: "Commercial contracts, vendor MSAs, NDAs, SaaS, licensing.", link: "/services/contracts" },
    { icon: <Building2 className="h-5 w-5" />, t: "Real Estate (Resi & Commercial)", d: "Purchase/sale, leases, title review, closings, due diligence.", link: "/services/real-estate" },
    { icon: <Handshake className="h-5 w-5" />, t: "Mediation & Settlement", d: "Early resolution strategies that protect relationships and cash flow.", link: "/services/mediation" },
    { icon: <ClipboardCheck className="h-5 w-5" />, t: "Regulatory & Compliance", d: "Policy reviews, privacy, PCI/HIPAA-aware workflows.", link: "/services/compliance" },
    { icon: <Landmark className="h-5 w-5" />, t: "Administrative & Agency Matters", d: "Licensing, hearings, appeals, and regulatory responses.", link: "/contact" },
    { icon: <Users className="h-5 w-5" />, t: "Employment Advisory", d: "Handbooks, wage/hour risk checks, offers, separations, disputes.", link: "/contact" },
    { icon: <Hammer className="h-5 w-5" />, t: "Civil Litigation (select)", d: "Strategic disputes with cost/benefit discipline.", link: "/contact" },
    { icon: <Banknote className="h-5 w-5" />, t: "Consumer Finance Issues", d: "Credit reporting errors, chargeback disputes, unfair practices.", link: "/contact" },
    { icon: <BookOpen className="h-5 w-5" />, t: "Estate Basics", d: "Simple wills, POA, healthcare directives (jurisdiction-aware).", link: "/contact" },
    { icon: <ShieldAlert className="h-5 w-5" />, t: "Risk & Dispute Triage", d: "Second opinions and rapid risk scoping before you spend big.", link: "/contact" },
  ];

  const verticals = [
    { icon: <Building className="h-5 w-5" />, t: "Homeowners & HOAs", d: "Appeals, covenants, vendor contracts, collections." },
    { icon: <Building2 className="h-5 w-5" />, t: "Commercial Owners", d: "Retail, hospitality, healthcare, industrial, office." },
    { icon: <Briefcase className="h-5 w-5" />, t: "Startups & SMBs", d: "General counsel support without in-house overhead." },
    { icon: <GraduationCap className="h-5 w-5" />, t: "Non-profits & Schools", d: "Grants, compliance, facility & vendor contracts." },
  ];

  const faqs = [
    { q: "Do you charge upfront?", a: "Most savings and many consumer matters are success-based. For other matters we provide transparent flat or scoped fees." },
    { q: "Can you work outside my state?", a: "We cover many U.S. markets directly and collaborate with local counsel where required by rules of practice." },
    { q: "How do engagements start?", a: "With a free case review. We scope options, timelines, and cost. You decide if/when to proceed." },
  ];

  const stats = [
    { k: "10k+", v: "billed cases reviewed", icon: <Users className="h-4 w-4" /> },
    { k: "Weeks", v: "average resolution time", icon: <Clock4 className="h-4 w-4" /> },
    { k: "0 upfront", v: "pay from savings (where applicable)", icon: <Banknote className="h-4 w-4" /> },
  ];

  const benefits = [
    { h: "Results-first", d: "We focus on measurable savings and risk reduction.", icon: <ShieldCheck className="h-4 w-4 text-emerald-600" /> },
    { h: "Frictionless", d: "Clear scopes, weekly updates, plain-language deliverables.", icon: <ClipboardCheck className="h-4 w-4 text-indigo-600" /> },
    { h: "Cost control", d: "Success-based, flat-fee, or scoped—no surprises.", icon: <Banknote className="h-4 w-4 text-slate-700" /> },
  ];

  const packages = [
    {
      name: "Success-Based (Savings)",
      points: [
        "Property tax, medical bills, some consumer matters",
        "You pay from realized savings (when applicable)",
        "Aligned incentives, clear documentation",
      ],
    },
    {
      name: "Flat / Project Fee",
      points: [
        "Scopable deliverables (contracts, filings, policy suites)",
        "Predictable pricing with milestone gates",
        "Great for startups & SMBs",
      ],
    },
    {
      name: "Counsel Subscription",
      points: [
        "Monthly bucket of legal hours",
        "Priority response, standing cadence",
        "Perfect in lieu of in-house counsel",
      ],
    },
  ];

  return (
    <main className="text-slate-800">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {/* soft gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_70%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(60%_60%_at_10%_10%,rgba(99,102,241,0.25),transparent)]" />
          {/* REPLACED BROKEN IMAGE WITH A RELIABLE ONE */}
          <img
            src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1600&q=80"
            alt="Law library"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-white/60" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-14 pt-24 md:grid-cols-2 md:px-6">
          <div>
            <p className="kicker text-indigo-600">Our services</p>
            <h1 className="font-serif text-4xl text-slate-900 md:text-5xl">Specialized help, measurable results</h1>
            <p className="mt-4 max-w-2xl text-slate-700">
              From fast savings matters to ongoing counsel, we combine negotiation, compliance, and dispute strategy to
              protect your money and momentum. Start with a free case review—no pressure, no upfront fee.
            </p>
            <div className="mt-6 flex gap-3">
              <Button className="rounded-full px-6" onClick={() => setDrawer(true)}>
                Book a free consultation
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/results">See recent results</Link>
              </Button>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Not legal advice. Engagements subject to conflicts & jurisdictional rules.
            </p>

            {/* Benefits strip */}
            <div className="mt-6 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2 rounded-xl border bg-white/90 px-4 py-3 backdrop-blur">
                  {b.icon}
                  <div>
                    <p className="text-sm font-medium text-slate-900">{b.h}</p>
                    <p className="text-xs text-slate-600">{b.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* “Conference” image — kept as <img> to avoid next/image domain config */}
          <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1528744598421-b7b93e12df0a?auto=format&fit=crop&w=1600&q=80"
              alt="Conference"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 rounded-xl bg-white/85 p-4 backdrop-blur">
              <p className="text-sm text-slate-600">Why clients choose us</p>
              <p className="font-serif text-lg text-slate-900">Relentless advocacy. Transparent fees.</p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="border-t bg-white/80 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-3 md:px-6">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border bg-white px-4 py-3">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  {s.icon}
                </div>
                <div>
                  <p className="text-base font-semibold text-slate-900">{s.k}</p>
                  <p className="text-xs text-slate-600">{s.v}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK LINKS to all services */}
      <section className="bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-wrap items-center gap-2">
            {quickLinks.map((q, i) => (
              <Link
                key={i}
                href={q.href}
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                <Sparkles className="h-4 w-4 text-indigo-600" />
                {q.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="kicker text-indigo-600">High-impact, fast value</p>
            <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">Popular engagements</h2>
            <p className="mt-2 text-slate-600">Quick wins that protect cash flow and remove friction.</p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_20%_-10%,rgba(99,102,241,.15),transparent)] opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  {s.icon}
                </div>
                <h3 className="mt-4 font-serif text-xl text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.blurb}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FULL CATALOG */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="kicker text-indigo-600">More ways we help</p>
            <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">Comprehensive practice coverage</h2>
          </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fullCatalog.map((s, i) => (
            <Card key={i} className="group transition-all hover:-translate-y-0.5 hover:shadow-md">
              <CardContent className="flex items-start gap-3 p-5">
                <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  {s.icon}
                </div>
                <div>
                  <p className="font-medium text-slate-900">{s.t}</p>
                  <p className="mt-1 text-sm text-slate-600">{s.d}</p>
                  <Link href={s.link} className="mt-2 inline-flex items-center text-sm font-medium text-indigo-600">
                    {s.link.startsWith("/services") ? "View service" : "Start a review"}{" "}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

          {/* Industries */}
          <div className="mt-14">
            <div className="mx-auto max-w-2xl text-center">
              <p className="kicker text-indigo-600">Industries we serve</p>
              <h3 className="font-serif text-2xl text-slate-900">Tailored to your world</h3>
              <p className="mt-2 text-slate-600">We adapt deliverables and evidence to the realities of your sector.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {verticals.map((v, i) => (
                <div key={i} className="rounded-2xl border bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-sm">
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    {v.icon}
                  </div>
                  <p className="font-medium text-slate-900">{v.t}</p>
                  <p className="mt-1 text-sm text-slate-600">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES & PRICING SNAPSHOT */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="kicker text-indigo-600">Pricing made simple</p>
            <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">Pick the model that fits</h2>
            <p className="mt-2 text-slate-600">
              We’ll recommend the best fit during your free case review—no pressure, no surprises.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {packages.map((p, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-6">
                  <p className="font-serif text-xl text-slate-900">{p.name}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {p.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button className="rounded-full px-6" onClick={() => setDrawer(true)}>
              Get my tailored quote
            </Button>
          </div>
        </div>
      </section>

      {/* MINI FAQ + CTA STRIP */}
      <section className="relative isolate overflow-hidden bg-slate-900 py-14 text-slate-100">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(60% 60% at 50% 0%, #4f46e5, transparent)" }}
        />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:grid-cols-3 md:px-6">
          <div className="md:col-span-2">
            <p className="text-indigo-300">FAQ</p>
            <h3 className="font-serif text-3xl">Answers, upfront</h3>
            <div className="mt-5 space-y-4">
              {faqs.map((f, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium">{f.q}</p>
                  <p className="mt-1 text-slate-200/90">{f.a}</p>
                </div>
              ))}
              <Link href="/faq" className="mt-2 inline-flex items-center text-indigo-300">
                View all questions <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/10 p-6">
            <div>
              <p className="text-indigo-200">Get started</p>
              <h4 className="font-serif text-2xl">Free case review</h4>
              <p className="mt-2 text-slate-200/90">
                Send documents securely, get timelines and options, then decide—no obligation.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" /> No upfront fees for savings matters
                </li>
                <li className="flex items-center gap-2">
                  <ScrollText className="h-4 w-4 text-indigo-300" /> Clear scope & flat-fee options
                </li>
                <li className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-indigo-300" /> Dedicated point of contact
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Button
                variant="secondary"
                className="w-full rounded-full bg-white text-slate-900 hover:bg-slate-100"
                onClick={() => setDrawer(true)}
              >
                Book a free consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl rounded-2xl border bg-gradient-to-tr from-indigo-50 to-white px-6 py-8 md:px-10">
          <div className="grid items-center gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <p className="kicker text-indigo-600">Ready when you are</p>
              <h4 className="font-serif text-2xl text-slate-900">Let’s map the fastest path to a win.</h4>
              <p className="mt-2 text-slate-600">
                Share context and documents; we’ll outline strategy, timeline, and pricing options.
              </p>
            </div>
            <div className="flex gap-3 md:justify-end">
              <Button className="rounded-full" onClick={() => setDrawer(true)}>
                Start my review
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/results">See results</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Drawer (15-min Calendly) */}
      <BookDrawer open={drawer} onOpenChange={setDrawer} prefill={prefill} />
    </main>
  );
}
