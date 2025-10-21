import Link from "next/link";
import {
  ShieldCheck, Lock, FileText, Users, Mail, Database, KeyRound, BadgeCheck,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy — Cumberland Brooks, LLC",
  description:
    "How we collect, use, and protect your information at Cumberland Brooks, LLC.",
};

const Item = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <li className="flex items-start gap-3 rounded-xl border bg-white/90 p-3">
    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
      {icon}
    </span>
    <span className="text-sm text-slate-700">{children}</span>
  </li>
);

export default function PrivacyPage() {
  return (
    <main className="bg-gradient-to-b from-white to-slate-50 text-slate-800">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_70%_at_70%_-10%,rgba(79,70,229,0.22),transparent),radial-gradient(60%_60%_at_10%_10%,rgba(99,102,241,0.18),transparent)]" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200">
            <ShieldCheck className="h-4 w-4" /> Privacy, security, transparency
          </p>
          <h1 className="mt-3 font-serif text-4xl text-slate-900 md:text-5xl">Privacy Policy</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            We protect your information with HIPAA/PCI-aware processes, encryption in transit, and least-privilege access.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        {/* Pillars */}
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <Lock />,
              h: "Security by design",
              d: "Encryption in transit, vendor diligence, audit trails, and role-based access.",
            },
            {
              icon: <FileText />,
              h: "Data minimization",
              d: "We collect only what’s necessary to evaluate or service your matter.",
            },
            {
              icon: <Users />,
              h: "Respect & control",
              d: "Request access, correction, or deletion where permitted by law.",
            },
          ].map((c, i) => (
            <div key={i} className="rounded-2xl border bg-white p-5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                {c.icon}
              </div>
              <p className="mt-3 font-medium text-slate-900">{c.h}</p>
              <p className="mt-2 text-sm text-slate-600">{c.d}</p>
            </div>
          ))}
        </div>

        {/* Sections as pretty cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-white p-5">
            <p className="font-serif text-lg text-slate-900">Information we collect</p>
            <ul className="mt-3 grid gap-2">
              <Item icon={<Users className="h-4 w-4" />}>
                <strong>Contact</strong>: name, email, phone, address you provide.
              </Item>
              <Item icon={<FileText className="h-4 w-4" />}>
                <strong>Case docs</strong>: bills, statements, contracts, and related facts you share.
              </Item>
              <Item icon={<Database className="h-4 w-4" />}>
                <strong>Technical</strong>: IP & basic analytics to improve the site—never sold.
              </Item>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="font-serif text-lg text-slate-900">How we use it</p>
            <ul className="mt-3 grid gap-2">
              <Item icon={<BadgeCheck className="h-4 w-4" />}>
                Evaluate, manage, and resolve your matter; provide service updates.
              </Item>
              <Item icon={<ShieldCheck className="h-4 w-4" />}>
                Verify identity, detect abuse, and meet legal obligations.
              </Item>
              <Item icon={<KeyRound className="h-4 w-4" />}>
                Improve service quality and user experience.
              </Item>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="font-serif text-lg text-slate-900">Retention</p>
            <p className="mt-2 text-sm text-slate-600">
              We retain data only as long as necessary for your engagement and as required by law or professional rules.
            </p>
            <div className="mt-3 rounded-xl border bg-slate-50 p-3 text-xs text-slate-600">
              We regularly review stored files and archive or delete when obligations end.
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="font-serif text-lg text-slate-900">Your choices</p>
            <ul className="mt-3 grid gap-2">
              <Item icon={<Mail className="h-4 w-4" />}>
                Unsubscribe from marketing anytime via footer links.
              </Item>
              <Item icon={<Users className="h-4 w-4" />}>
                Request access, correction, or deletion where permitted by law.
              </Item>
              <Item icon={<ShieldCheck className="h-4 w-4" />}>
                Ask about our safeguards and vendor practices—we’ll answer plainly.
              </Item>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border bg-white p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-indigo-600">Trust & clarity</p>
              <h3 className="font-serif text-2xl text-slate-900">Have a privacy request?</h3>
              <p className="text-slate-600">We’ll respond promptly and transparently.</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border bg-slate-900 px-5 py-2 text-white hover:bg-slate-800"
            >
              Contact our privacy team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
