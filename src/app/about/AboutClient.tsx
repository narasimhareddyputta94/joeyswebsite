// src/app/about/AboutClient.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BookDrawer from "@/components/BookDrawer";
import {
  ShieldCheck,
  Scale,
  CheckCircle2,
  Building2,
  Clock4,
  FileCheck2,
  ArrowRight,
  Sparkles,
  Gavel,
  Stethoscope,
  Landmark,
  LandPlot,
  FileSearch,
  BarChart3,
  Handshake,
  DollarSign,
  ClipboardCheck,
  Lock,
  BadgeCheck,
  FileText,
  Shield,
  HelpCircle,
} from "lucide-react";

export default function AboutClient() {
  const [drawer, setDrawer] = useState(false);
  const [prefill, setPrefill] = useState<{
    name?: string;
    email?: string;
    address?: string;
    ptype?: "residential" | "commercial";
  }>();

  // Listen for global "open-book" fired by Navbar, sticky CTA, etc.
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

  return (
    <main className="text-slate-800">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1600&auto=format&fit=crop"
            alt="Law team negotiating with clients"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top_right,rgba(15,23,42,0.72),rgba(15,23,42,0.15))]" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-24 md:grid-cols-12 md:px-6">
          <div className="md:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-indigo-200 ring-1 ring-white/20 backdrop-blur">
              <ShieldCheck className="h-4 w-4" />
              No upfront fees — you pay from savings
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-white md:text-5xl">
              Relentless advocacy. Transparent results.
            </h1>
            <p className="mt-4 max-w-2xl text-slate-100/90">
              We’re a negotiations-first firm. From medical bill audits to property tax appeals and collections
              disputes—we obsess over <em>outcomes you can measure</em>, not billable hours.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button className="rounded-full px-6" onClick={() => setDrawer(true)}>
                Book Free Consultation <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full backdrop-blur bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                <Link href="/results">See our wins</Link>
              </Button>
            </div>

            <div className="mt-6 grid max-w-xl grid-cols-3 gap-4 text-white/90">
              <Stat k="10k+" t="billed cases reviewed" />
              <Stat k="Weeks" t="typical resolution time" />
              <Stat k="0 upfront" t="fees — ever" />
            </div>
          </div>

          {/* Trust panel */}
          <div className="md:col-span-5">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur shadow-lg shadow-slate-900/10">
              <div className="flex items-center gap-2 text-indigo-100">
                <Scale className="h-5 w-5" />
                <p className="text-sm font-medium">What we stand for</p>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" /> Results-first fee model</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" /> Clear communication & consent</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" /> HIPAA/PCI-aware, secure workflows</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" /> Ethical practice, precise analysis</li>
              </ul>
              <p className="mt-4 text-xs text-white/80">
                If we don’t save you money, you owe us nothing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE HELP */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kicker text-indigo-600">Who we help</p>
            <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">Individuals, families, and operators</h2>
            <p className="mt-3 text-slate-600">
              Medical bills, property taxes, collections, utility disputes—we partner with people and businesses
              who want clean outcomes and straight talk.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <InfoCard icon={<Stethoscope className="h-5 w-5" />} h="Patients & families" d="Reduce hospital/clinic balances, fix coding errors, and set realistic payment plans." />
            <InfoCard icon={<Building2 className="h-5 w-5" />} h="Owners & operators" d="Lower assessed value, unwind back-billing, and enforce contract terms with vendors." />
            <InfoCard icon={<Gavel className="h-5 w-5" />} h="Consumers with collections" d="Validate balances, remove junk fees, and pursue cleaner reporting when supported." />
          </div>
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kicker text-indigo-600">Our mission</p>
            <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">
              Make complex bills and bureaucracy feel simple—and fair.
            </h2>
            <p className="mt-3 text-slate-600">
              We blend legal expertise with analyst-grade audits and negotiation playbooks. The result:
              fewer surprises, faster resolutions, and real-dollar savings you can verify.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Pillar icon={<FileCheck2 />} h="Precision over pressure" d="Exhaustive audit trails, documented comps, and clear consent at every step." />
            <Pillar icon={<Clock4 />} h="Momentum matters" d="Fast intake, tight loops, and weekly updates—so you always know the next move." />
            <Pillar icon={<Building2 />} h="Built for outcomes" d="We target what moves the needle: lower balances, reduced assessments, cleaner credit." />
          </div>
        </div>
      </section>

      {/* HOW WE WORK (timeline) */}
      <section className="relative bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kicker text-indigo-600">How we work</p>
            <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">A simple 4-step path to savings</h2>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <ul className="relative space-y-5 before:absolute before:left-5 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-indigo-200 before:via-indigo-200 before:to-transparent md:before:left-1/2">
              {[
                { t: "Free case review", d: "Share documents securely; we identify savings opportunities fast." },
                { t: "Strategy & authorization", d: "Clear plan of attack—no moves without your approval." },
                { t: "Negotiate & resolve", d: "We coordinate with providers, boards, and agencies to lock in reductions." },
                { t: "You save", d: "You only pay from realized savings—no surprises." },
              ].map((s, i) => (
                <TimelineItem key={i} i={i} t={s.t} d={s.d} />
              ))}
            </ul>

            <div className="mt-8 rounded-xl border bg-slate-50 p-5 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                Typical kickoff happens within a week. Complex cases may take longer; we’ll keep you updated weekly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CASE-TYPE PLAYBOOKS (deeper, practical) */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kicker text-indigo-600">How we handle your case</p>
            <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">Specific playbooks for different problems</h2>
            <p className="mt-3 text-slate-600">
              Different disputes need different levers. We bring the right audit methods, evidence, and negotiation angles for each category.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Playbook
              icon={<Stethoscope className="h-5 w-5" />}
              title="Medical Bills & Healthcare"
              desc="We target coding errors, out-of-network misclassifications, and duplicate line items, then anchor negotiations on payer policy and reasonableness."
              chips={[
                "CPT/HCPCS review",
                "Chargemaster audit",
                "Denial management",
                "Financial assistance routing",
              ]}
              triad={[
                { icon: <FileSearch className="h-4 w-4 text-indigo-600" />, h: "Audit", d: "Code review, duplicates, clinical context" },
                { icon: <BarChart3 className="h-4 w-4 text-indigo-600" />, h: "Analysis", d: "Policy memos, denial letters, UCR" },
                { icon: <Handshake className="h-4 w-4 text-indigo-600" />, h: "Negotiate", d: "Provider concessions & plans" },
              ]}
              badgeIcon={<DollarSign className="h-4 w-4" />}
              badgeText="Typical outcome: sizable balance reductions"
            />

            <Playbook
              icon={<Landmark className="h-5 w-5" />}
              title="Property Tax Appeals (Resi & Commercial)"
              desc="We run comps, NOI/cap-rate models, and condition adjustments—then present a tight record to assessors and boards."
              chips={[
                "Sales & income approach",
                "Vacancy & EGI adjustments",
                "Cap-rate comps",
                "Hearing representation",
              ]}
              triad={[
                { icon: <ClipboardCheck className="h-4 w-4 text-indigo-600" />, h: "Evidence", d: "Comps, photos, condition" },
                { icon: <BarChart3 className="h-4 w-4 text-indigo-600" />, h: "Valuation", d: "NOI model, cap-rate, sensitivity" },
                { icon: <Handshake className="h-4 w-4 text-indigo-600" />, h: "Hearing", d: "Prep & annual re-checks" },
              ]}
              badgeIcon={<Building2 className="h-4 w-4" />}
              badgeText="Typical outcome: lower assessed value → lower taxes"
            />

            <Playbook
              icon={<Gavel className="h-5 w-5" />}
              title="Credit Card Debt & Collections"
              desc="We validate balances, challenge fee stacking, and use compliance leverage (when supported) to clean up reporting."
              chips={[
                "FDCPA/FCRA validation",
                "Itemization review",
                "Pay-for-delete (when viable)",
                "Score recovery path",
              ]}
              triad={[
                { icon: <FileSearch className="h-4 w-4 text-indigo-600" />, h: "Validation", d: "Docs, itemization, errors" },
                { icon: <Handshake className="h-4 w-4 text-indigo-600" />, h: "Settlement", d: "Concessions & PFD" },
                { icon: <ClipboardCheck className="h-4 w-4 text-indigo-600" />, h: "Recovery", d: "Rebuild roadmap" },
              ]}
              badgeIcon={<ShieldCheck className="h-4 w-4" />}
              badgeText="Typical outcome: reduced balance + cleaner reporting"
            />

            <Playbook
              icon={<LandPlot className="h-5 w-5" />}
              title="Utilities & Telecom Disputes"
              desc="We unwind back-billing, improper fees, and outage credits using provider tariffs and billing rules."
              chips={[
                "Back-bill windows",
                "Tariff analysis",
                "Outage credits",
                "Fee removals",
              ]}
              triad={[
                { icon: <FileSearch className="h-4 w-4 text-indigo-600" />, h: "Audit", d: "Billing windows & line items" },
                { icon: <BarChart3 className="h-4 w-4 text-indigo-600" />, h: "Rules", d: "Tariffs, policy, outages" },
                { icon: <Handshake className="h-4 w-4 text-indigo-600" />, h: "Adjustment", d: "Credits & refunds" },
              ]}
              badgeIcon={<DollarSign className="h-4 w-4" />}
              badgeText="Typical outcome: corrected billing & refunds/credits"
            />
          </div>
        </div>
      </section>

      {/* FEES, SECURITY, COMPLIANCE */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="transition hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-indigo-600"><DollarSign className="h-5 w-5" /><p className="font-medium">How fees work</p></div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-600" /> No upfront fees for savings-driven matters</li>
                  <li className="flex gap-2"><BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-600" /> Clear scope for flat/other matters</li>
                  <li className="flex gap-2"><BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-600" /> You approve every move & cost</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="transition hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-indigo-600"><Lock className="h-5 w-5" /><p className="font-medium">Security & privacy</p></div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><Shield className="mt-0.5 h-4 w-4 text-indigo-600" /> Encrypted intake & least-privilege access</li>
                  <li className="flex gap-2"><Shield className="mt-0.5 h-4 w-4 text-indigo-600" /> HIPAA/PCI-aware workflows</li>
                  <li className="flex gap-2"><Shield className="mt-0.5 h-4 w-4 text-indigo-600" /> Weekly status with consent gates</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="transition hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-indigo-600"><FileText className="h-5 w-5" /><p className="font-medium">Compliance & ethics</p></div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-600" /> Evidence-driven negotiation</li>
                  <li className="flex gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-600" /> Clear disclosures, no pressure</li>
                  <li className="flex gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-600" /> Documented outcomes & closeout</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Micro-FAQ */}
          <div className="mx-auto mt-10 max-w-5xl">
            <h3 className="font-serif text-2xl text-slate-900">Quick answers</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <FAQ q="Do I pay anything to start?" a="No. For savings matters, our compensation comes from the savings we secure. Other engagements use a transparent flat or clearly-scoped fee." />
              <FAQ q="How fast is kickoff?" a="Usually within a week. Appeals tied to board calendars can take longer—we set expectations on day one and update weekly." />
              <FAQ q="Will this hurt my credit?" a="We’re credit-aware. Where supported by law and evidence, we pursue deletions or corrected reporting. We don’t advise moves that jeopardize key goals." />
            </div>
          </div>
        </div>
      </section>

      {/* PROOF & PROMISE */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Proof k="No upfront" t="You pay from realized savings" icon={<ShieldCheck className="h-5 w-5 text-indigo-600" />} />
            <Proof k="Weeks" t="Typical resolution timeline" icon={<Clock4 className="h-5 w-5 text-indigo-600" />} />
            <Proof k="Clear updates" t="Weekly status & consent gates" icon={<Sparkles className="h-5 w-5 text-indigo-600" />} />
          </div>

          <div className="mt-10 rounded-2xl border bg-slate-900 p-6 text-slate-100">
            <div className="grid items-center gap-4 md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="text-indigo-300">Ready when you are</p>
                <h3 className="mt-1 font-serif text-2xl">Let’s turn your bills and balances into savings.</h3>
                <p className="mt-1 text-slate-300">
                  Start with a free case review—no pressure, no upfront fees. We’ll show you where the savings are and how we’ll get them.
                </p>
              </div>
              <div className="md:col-span-4">
                <div className="flex flex-col gap-2">
                  <Button className="rounded-full" onClick={() => setDrawer(true)}>
                    Book Free Consultation
                  </Button>
                  <Button asChild variant="secondary" className="rounded-full bg-white text-slate-900 hover:bg-slate-100">
                    <Link href="/services">Explore Services</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drawer (15-min Calendly) */}
      <BookDrawer open={drawer} onOpenChange={setDrawer} prefill={prefill} />
    </main>
  );
}

/* ============= tiny components ============= */

function Stat({ k, t }: { k: string; t: string }) {
  return (
    <div>
      <p className="text-2xl font-semibold leading-none">{k}</p>
      <p className="mt-1 text-sm opacity-80">{t}</p>
    </div>
  );
}

function InfoCard({ icon, h, d }: { icon: JSX.Element; h: string; d: string }) {
  return (
    <Card className="transition hover:shadow-md">
      <CardContent className="p-6">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">{icon}</div>
        <p className="mt-3 font-medium text-slate-900">{h}</p>
        <p className="mt-2 text-sm text-slate-600">{d}</p>
      </CardContent>
    </Card>
  );
}

function Pillar({ icon, h, d }: { icon: JSX.Element; h: string; d: string }) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </div>
        <p className="mt-3 font-medium text-slate-900">{h}</p>
        <p className="mt-2 text-sm text-slate-600">{d}</p>
      </CardContent>
    </Card>
  );
}

function TimelineItem({ i, t, d }: { i: number; t: string; d: string }) {
  return (
    <li className="relative rounded-2xl border bg-white/90 p-5 shadow-sm backdrop-blur transition-shadow hover:shadow-md md:grid md:grid-cols-12 md:gap-6">
      <div className="relative z-10 -ml-0.5 flex items-start gap-3 md:col-span-3 md:-ml-0 md:justify-center">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white ring-4 ring-white md:h-10 md:w-10">
          {i + 1}
        </span>
        <p className="md:hidden font-medium text-slate-900">{t}</p>
      </div>
      <div className="md:col-span-9">
        <p className="hidden md:block font-medium text-slate-900">{t}</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{d}</p>
      </div>
    </li>
  );
}

function Playbook({
  icon,
  title,
  desc,
  chips,
  triad,
  badgeIcon,
  badgeText,
}: {
  icon: JSX.Element;
  title: string;
  desc: string;
  chips: string[];
  triad: { icon: JSX.Element; h: string; d: string }[];
  badgeIcon: JSX.Element;
  badgeText: string;
}) {
  return (
    <Card className="transition hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 text-indigo-600">
          {icon}
          <p className="font-medium">{title}</p>
        </div>
        <p className="mt-2 text-sm text-slate-600">{desc}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((c, i) => (
            <span key={i} className="rounded-full border bg-white px-2.5 py-1 text-xs text-slate-700">
              {c}
            </span>
          ))}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-3 text-xs text-slate-700">
          {triad.map((t, i) => (
            <div key={i} className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-2">
                {t.icon}
                <p className="font-medium text-slate-900">{t.h}</p>
              </div>
              <p className="mt-1">{t.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 text-xs">
          {badgeIcon} {badgeText}
        </div>
      </CardContent>
    </Card>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <Card className="bg-white">
      <CardContent className="p-5">
        <p className="font-medium text-slate-900">{q}</p>
        <p className="mt-2 text-sm text-slate-600">{a}</p>
        <div className="mt-3">
          <Link href="/services" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-700 hover:underline">
            Learn more <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function Proof({ k, t, icon }: { k: string; t: string; icon: JSX.Element }) {
  return (
    <Card className="border-indigo-100">
      <CardContent className="flex items-center gap-3 p-5">
        {icon}
        <div>
          <p className="text-2xl font-semibold text-slate-900">{k}</p>
          <p className="text-sm text-slate-600">{t}</p>
        </div>
      </CardContent>
    </Card>
  );
}
