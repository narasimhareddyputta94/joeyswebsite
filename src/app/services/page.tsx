"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronRight, Scale, Gavel, ShieldCheck, Landmark, Building2, Briefcase, FileText,
  Handshake, Building, Users, Stethoscope, GraduationCap, Key, ClipboardCheck,
  Hammer, Banknote, BookOpen, UserRound, ShieldAlert, ScrollText
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const container = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, duration: .5 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function ServicesPage() {
  const featured = [
    {
      href: "/services/property-tax",
      icon: <Scale className="h-6 w-6" />,
      title: "Property Tax Appeals",
      blurb: "Lower assessments for residential & commercial property. Pay only from realized savings."
    },
    {
      href: "/services/medical-bills",
      icon: <Stethoscope className="h-6 w-6" />,
      title: "Medical Bills & Healthcare",
      blurb: "Audit errors, correct miscoding, and negotiate balances with providers/payers."
    },
    {
      href: "/services/collections",
      icon: <Gavel className="h-6 w-6" />,
      title: "Debt & Collections Defense",
      blurb: "Dispute inaccuracies, curb fee stacking, and negotiate realistic outcomes."
    },
  ];

  const fullCatalog = [
    { icon: <Briefcase className="h-5 w-5" />, t: "Business & Startups", d: "Entity formation, operating agreements, cap tables, governance.", link: "/contact" },
    { icon: <FileText className="h-5 w-5" />, t: "Contracts & Negotiation", d: "Commercial contracts, vendor MSAs, NDAs, SaaS, licensing.", link: "/contact" },
    { icon: <Building2 className="h-5 w-5" />, t: "Real Estate (Resi & Commercial)", d: "Purchase/sale, leases, title review, closings, due diligence.", link: "/contact" },
    { icon: <Handshake className="h-5 w-5" />, t: "Mediation & Settlement", d: "Early resolution strategies that protect relationships and cash flow.", link: "/contact" },
    { icon: <Landmark className="h-5 w-5" />, t: "Administrative & Agency Matters", d: "Licensing, hearings, appeals, and regulatory responses.", link: "/contact" },
    { icon: <Users className="h-5 w-5" />, t: "Employment Advisory", d: "Handbooks, wage/hour risk checks, offers, separations, disputes.", link: "/contact" },
    { icon: <Key className="h-5 w-5" />, t: "Landlord / Tenant", d: "Compliance, notices, habitability issues, settlements.", link: "/contact" },
    { icon: <ClipboardCheck className="h-5 w-5" />, t: "Compliance Audits", d: "Policy reviews, privacy, PCI/HIPAA-aware workflows.", link: "/contact" },
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

  return (
    <main className="text-slate-800">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_70%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(60%_60%_at_10%_10%,rgba(99,102,241,0.25),transparent)]" />
          <Image
            src="https://images.unsplash.com/photo-1528747045269-390fe33c19d8?q=80&w=1600&auto=format&fit=crop"
            alt="Law library"
            fill
            className="object-cover opacity-30"
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
              <Button asChild className="rounded-full px-6">
                <Link href="/contact">Book a free consultation</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/results">See recent results</Link>
              </Button>
            </div>
            <p className="mt-2 text-xs text-slate-500">Not legal advice. Engagements subject to conflicts & jurisdictional rules.</p>
          </div>

          <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1528744598421-b7b93e12df0a?q=80&w=1600&auto=format&fit=crop"
              alt="Conference"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 rounded-xl bg-white/85 p-4 backdrop-blur">
              <p className="text-sm text-slate-600">Why clients choose us</p>
              <p className="font-serif text-lg text-slate-900">Relentless advocacy. Transparent fees.</p>
            </div>
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

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {featured.map((s, i) => (
              <motion.a
                variants={item}
                key={i}
                href={s.href}
                className="group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
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
              </motion.a>
            ))}
          </motion.div>
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
              <Card key={i} className="group transition-shadow hover:shadow-md">
                <CardContent className="flex items-start gap-3 p-5">
                  <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    {s.icon}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{s.t}</p>
                    <p className="mt-1 text-sm text-slate-600">{s.d}</p>
                    <Link href={s.link} className="mt-2 inline-flex items-center text-sm font-medium text-indigo-600">
                      Start a review <ChevronRight className="ml-1 h-4 w-4" />
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
                <div key={i} className="rounded-2xl border bg-white p-5">
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">{v.icon}</div>
                  <p className="font-medium text-slate-900">{v.t}</p>
                  <p className="mt-1 text-sm text-slate-600">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MINI FAQ + CTA STRIP */}
      <section className="relative isolate overflow-hidden bg-slate-900 py-14 text-slate-100">
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(60% 60% at 50% 0%, #4f46e5, transparent)" }} />
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
                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" /> No upfront fees for savings matters</li>
                <li className="flex items-center gap-2"><ScrollText className="h-4 w-4 text-indigo-300" /> Clear scope & flat-fee options</li>
                <li className="flex items-center gap-2"><UserRound className="h-4 w-4 text-indigo-300" /> Dedicated point of contact</li>
              </ul>
            </div>
            <div className="mt-6">
              <Button asChild variant="secondary" className="w-full rounded-full bg-white text-slate-900 hover:bg-slate-100">
                <Link href="/contact">Book a free consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
