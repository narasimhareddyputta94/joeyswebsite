"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Lock,
  Clock4,
  CheckCircle2,
  ArrowRight,
  Copy,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  const [copied, setCopied] = useState<"phone" | "email" | null>(null);
  const [sent, setSent] = useState(false);

  const PHONE = "(312) 488-9775";
  const EMAIL = "info@cumberlandbrooks.com";
  const ADDRESS = "732 S. 6th St., Ste. R, Las Vegas, NV 89101"; // Updated address per your content

  async function copy(text: string, key: "phone" | "email") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  }

  return (
    <main className="text-slate-800">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{ background: "radial-gradient(60% 60% at 50% 0%, #4f46e5, transparent)" }}
        />
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-indigo-200 ring-1 ring-white/20 backdrop-blur">
              <ShieldCheck className="h-4 w-4" /> No upfront fees — you pay from savings
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-white md:text-5xl">
              Contact Us
            </h1>
            <p className="mt-3 text-lg text-slate-200/90">
              Send a message or call us directly. No pressure, no retainer—just clear next steps and real savings.
            </p>

            {/* quick trust */}
            <div className="mt-6 grid grid-cols-1 gap-4 text-slate-200/90 sm:grid-cols-3">
              <div className="rounded-xl border border-white/15 bg-white/5 p-3 backdrop-blur">
                <div className="flex items-center gap-2">
                  <Clock4 className="h-4 w-4 text-indigo-300" />
                  <p className="text-sm">Kickoff in ~1 week</p>
                </div>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/5 p-3 backdrop-blur">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-indigo-300" />
                  <p className="text-sm">HIPAA/PCI-aware intake</p>
                </div>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/5 p-3 backdrop-blur">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-300" />
                  <p className="text-sm">You pay from savings</p>
                </div>
              </div>
            </div>
          </div>

          {/* quick contact cards */}
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
            <Card className="border-white/15 bg-white/5 text-slate-200 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-indigo-300" />
                    <p className="text-sm">Call</p>
                  </div>
                  <button
                    aria-label="Copy phone"
                    onClick={() => copy(PHONE, "phone")}
                    className="rounded-full p-1.5 hover:bg-white/10"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <a href={`tel:+13124889775`} className="mt-2 block font-medium text-white hover:underline">
                  {PHONE}
                </a>
                <p className="mt-1 text-xs text-slate-300">Weekdays 9–6 (CT)</p>
                {copied === "phone" && <p className="mt-2 text-xs text-emerald-300">Copied ✔</p>}
              </CardContent>
            </Card>

            <Card className="border-white/15 bg-white/5 text-slate-200 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-indigo-300" />
                    <p className="text-sm">Email</p>
                  </div>
                  <button
                    aria-label="Copy email"
                    onClick={() => copy(EMAIL, "email")}
                    className="rounded-full p-1.5 hover:bg-white/10"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <a href={`mailto:${EMAIL}`} className="mt-2 block font-medium text-white hover:underline">
                  {EMAIL}
                </a>
                <p className="mt-1 text-xs text-slate-300">Replies within 1 business day</p>
                {copied === "email" && <p className="mt-2 text-xs text-emerald-300">Copied ✔</p>}
              </CardContent>
            </Card>

            <Card className="border-white/15 bg-white/5 text-slate-200 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-indigo-300" />
                  <p className="text-sm">Office</p>
                </div>
                <p className="mt-2 font-medium text-white">{ADDRESS}</p>
                <p className="mt-1 text-xs text-slate-300">By appointment only</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* BODY: Info Text + Form */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            
            {/* Left Column: Information Text */}
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="font-serif text-3xl text-slate-900">
                At Cumberland Brooks, LLC, we're here to help you reduce costs and resolve complex billing issues.
              </h2>
              <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                <p>
                  Whether you're looking to lower your property taxes or need expert support disputing medical bills or collection accounts, our expert team is ready to assist you.
                </p>
                <p>
                  We value transparency, efficiency, and results—and we’re committed to providing personalized service to each of our clients.
                </p>
              </div>
              
              <div className="pt-4">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-indigo-700 bg-indigo-50 px-4 py-2 rounded-lg">
                  <Mail className="h-4 w-4" />
                  {EMAIL}
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <ContactForm sent={sent} setSent={setSent} />
          </div>

          {/* Removed the "10k cases" Stats Strip here */}

          {/* Micro FAQ */}
          <div className="mx-auto mt-16 max-w-5xl">
            <h3 className="font-serif text-2xl text-slate-900">Quick answers</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <FAQCard
                q="Do I pay anything to start?"
                a="No. Our fee comes from the savings we secure for you. If we don’t save you money, you owe us nothing."
              />
              <FAQCard
                q="How soon can we begin?"
                a="We typically kick off within a week. If you have deadlines (e.g., appeal windows), we’ll triage accordingly."
              />
              <FAQCard
                q="Is my data secure?"
                a="Yes. We use encrypted intake and operate HIPAA/PCI-aware workflows with least-privilege access."
              />
            </div>
          </div>

          {/* Final CTA */}
          <div className="mx-auto mt-16 max-w-4xl rounded-2xl border bg-slate-900 p-8 text-slate-100">
            <div className="grid items-center gap-6 md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="text-indigo-300 font-medium">Ready when you are</p>
                <h4 className="mt-2 font-serif text-2xl">
                  Let’s turn your bills and balances into savings.
                </h4>
                <p className="mt-2 text-slate-300">
                  Book now or send a short note—we’ll reply with clear next steps and expected timelines.
                </p>
              </div>
              <div className="md:col-span-4">
                <div className="flex flex-col gap-3">
                  {/* Redirects to Email Client */}
                  <Button
                    asChild
                    className="rounded-full w-full"
                  >
                    <a href={`mailto:${EMAIL}`}>Book Free Consultation</a>
                  </Button>
                  
                  <Button
                    asChild
                    variant="secondary"
                    className="rounded-full w-full bg-white text-slate-900 hover:bg-slate-100"
                  >
                    <Link href="/services">Explore Services</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ------------------- subcomponents ------------------- */

function ContactForm({
  sent,
  setSent,
}: {
  sent: boolean;
  setSent: (v: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(true);

  return (
    <form
      className="rounded-2xl border bg-slate-50 p-6 shadow-sm"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const data = Object.fromEntries(new FormData(form).entries());
        setLoading(true);
        try {
          await fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...data,
              consent,
              source: "contact-page",
              middleName: "", // honeypot
            }),
          });
          setSent(true);
          form.reset();
        } finally {
          setLoading(false);
        }
      }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-900">Send us a message</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
          <MessageSquare className="h-3.5 w-3.5" /> Replies within 1 business day
        </span>
      </div>

      <div className="mt-5 grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-600">First Name (required)</label>
            <input
              name="firstName"
              required
              autoComplete="given-name"
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Last Name</label>
            <input
              name="lastName"
              autoComplete="family-name"
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-slate-600">Email (required)</label>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Message (required)</label>
          <textarea
            name="message"
            rows={5}
            required
            className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* consent + honeypot */}
        <input type="text" name="middleName" className="hidden" tabIndex={-1} autoComplete="off" />
        <label className="mt-1 inline-flex items-center gap-2 text-xs text-slate-600">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          I agree to be contacted about my inquiry. No spam—ever.
        </label>
      </div>

      <Button type="submit" className="mt-6 w-full rounded-full" disabled={loading}>
        {loading ? "Sending…" : "SEND"}
      </Button>

      {sent ? (
        <p className="mt-3 text-sm text-emerald-700 text-center">
          Thanks—your message is in. We’ll get back shortly.
        </p>
      ) : (
        <p className="mt-3 text-xs text-slate-500 text-center">
          By sending this form, you agree to our privacy policy. Your data is encrypted in transit.
        </p>
      )}
    </form>
  );
}

function FAQCard({ q, a }: { q: string; a: string }) {
  return (
    <Card className="bg-white">
      <CardContent className="p-5">
        <p className="font-medium text-slate-900">{q}</p>
        <p className="mt-2 text-sm text-slate-600">{a}</p>
        <div className="mt-3">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm font-medium text-indigo-700 hover:underline"
          >
            Learn more <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}