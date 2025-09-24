// src/app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShieldCheck,
  Scale,
  CheckCircle2,
  Building2,
  Clock4,
  FileCheck2,
  ArrowRight,
  Users2,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "About — Cumberland Brooks, LLC",
  description:
    "Relentless advocacy. Transparent results. Learn how Cumberland Brooks, LLC delivers real savings with no upfront fees.",
};

export default function AboutPage() {
  return (
    <main className="text-slate-800">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1600&auto=format&fit=crop"
            alt="Law team negotiating with clients"
            fill
            priority
            className="object-cover"
          />
          {/* Overlay gradient */}
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
              We’re a negotiations-first law firm. From medical bill audits to property tax
              appeals and collections disputes—we focus on <em>outcomes you can measure</em>.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild className="rounded-full px-6">
                <Link href="/book">
                  Book Free Consultation <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full backdrop-blur bg-white/10 text-white border-white/30 hover:bg-white/20">
                <Link href="/results">See our wins</Link>
              </Button>
            </div>

            <div className="mt-6 grid max-w-xl grid-cols-3 gap-4 text-white/90">
              <div>
                <p className="text-2xl font-semibold leading-none">10k+</p>
                <p className="mt-1 text-sm opacity-80">billed cases reviewed</p>
              </div>
              <div>
                <p className="text-2xl font-semibold leading-none">Weeks</p>
                <p className="mt-1 text-sm opacity-80">average resolution time</p>
              </div>
              <div>
                <p className="text-2xl font-semibold leading-none">0 upfront</p>
                <p className="mt-1 text-sm opacity-80">fees — ever</p>
              </div>
            </div>
          </div>

          {/* Right-side trust panel */}
          <div className="md:col-span-5">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur shadow-lg shadow-slate-900/10">
              <div className="flex items-center gap-2 text-indigo-100">
                <Scale className="h-5 w-5" />
                <p className="text-sm font-medium">What we stand for</p>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                  Results-first fee model
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                  Clear communication & consent
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                  HIPAA/PCI-aware, secure workflows
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                  Ethical practice, precise analysis
                </li>
              </ul>
              <p className="mt-4 text-xs text-white/80">
                We align incentives with your success. If we don’t save you money, you owe us nothing.
              </p>
            </div>
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
            <Card className="transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FileCheck2 />
                </div>
                <p className="mt-3 font-medium text-slate-900">Precision over pressure</p>
                <p className="mt-2 text-sm text-slate-600">
                  Exhaustive audit trails, transparent redlines, and clear consent at every step.
                </p>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Building2 />
                </div>
                <p className="mt-3 font-medium text-slate-900">Built for outcomes</p>
                <p className="mt-2 text-sm text-slate-600">
                  We focus on what moves the needle: documented savings and credit score relief.
                </p>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Clock4 />
                </div>
                <p className="mt-3 font-medium text-slate-900">Momentum matters</p>
                <p className="mt-2 text-sm text-slate-600">
                  Fast starts, tight loops, and weekly updates—so you always know where you stand.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PROCESS (improved timeline) */}
<section className="relative bg-white py-20">
  <div className="mx-auto max-w-7xl px-4 md:px-6">
    <div className="mx-auto max-w-3xl text-center">
      <p className="kicker text-indigo-600">How we work</p>
      <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">
        A simple 4-step path to savings
      </h2>
    </div>

    <div className="mx-auto mt-12 max-w-4xl">
      {/* vertical guide line */}
      <ul className="relative space-y-5 before:absolute before:left-5 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-indigo-200 before:via-indigo-200 before:to-transparent md:before:left-1/2">
        {[
          {
            t: "Free case review",
            d: "Share documents securely; we identify savings opportunities fast.",
          },
          {
            t: "Strategy & authorization",
            d: "Clear plan of attack—no moves without your approval.",
          },
          {
            t: "Negotiate & resolve",
            d: "We coordinate with hospitals, tax bodies, and agencies to lock in reductions.",
          },
          {
            t: "You save",
            d: "You only pay from realized savings—no surprises.",
          },
        ].map((s, i) => (
          <li
            key={i}
            className="relative rounded-2xl border bg-white/90 p-5 shadow-sm backdrop-blur transition-shadow hover:shadow-md md:grid md:grid-cols-12 md:gap-6"
          >
            {/* step badge */}
            <div className="relative z-10 -ml-0.5 flex items-start gap-3 md:col-span-3 md:-ml-0 md:justify-center">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white ring-4 ring-white md:h-10 md:w-10">
                {i + 1}
              </span>
              <p className="md:hidden font-medium text-slate-900">{s.t}</p>
            </div>

            {/* text */}
            <div className="md:col-span-9">
              <p className="hidden md:block font-medium text-slate-900">{s.t}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.d}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* note */}
      <div className="mt-8 rounded-xl border bg-slate-50 p-5 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-600" />
          Typical kickoff happens within a week. Complex cases may take longer; we’ll keep you updated weekly.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* LEADERSHIP */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kicker text-indigo-600">Leadership</p>
            <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">Experienced, precise, and human</h2>
            <p className="mt-3 text-slate-600">
              Our cross-functional team includes attorneys, analysts, and negotiators who care about outcomes—not billable hours.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Alexandra Brooks, Esq.",
                role: "Managing Partner",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "Jordan Lee",
                role: "Senior Case Analyst",
                img: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "Samir Patel",
                role: "Negotiations Lead",
                img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop",
              },
            ].map((p, i) => (
              <Card key={i} className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative h-56 w-full">
                  <Image src={p.img} alt={p.name} fill className="object-cover" />
                </div>
                <CardContent className="p-5">
                  <p className="font-serif text-lg text-slate-900">{p.name}</p>
                  <p className="text-sm text-slate-600">{p.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild className="rounded-full px-6">
              <Link href="/team">Meet the full team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative isolate overflow-hidden bg-slate-900 py-20 text-slate-100">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(60% 60% at 50% 0%, #4f46e5, transparent)" }}
        />
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="text-indigo-300">Ready when you are</p>
              <h3 className="mt-1 font-serif text-3xl">Let’s turn your bills and balances into savings.</h3>
              <p className="mt-2 max-w-2xl text-slate-200">
                Start with a free case review—no pressure, no upfront fees. We’ll show you where the savings are and how we’ll get them.
              </p>
            </div>
            <div className="md:col-span-4">
              <div className="flex flex-col gap-3">
                <Button asChild className="rounded-full">
                  <Link href="/book">Book Free Consultation</Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  className="rounded-full bg-white text-slate-900 hover:bg-slate-100"
                >
                  <Link href="/services">Explore Services</Link>
                </Button>
                <p className="mt-1 flex items-center justify-center gap-2 text-xs text-slate-300">
                  <Users2 className="h-4 w-4" /> 10k+ billed cases reviewed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
