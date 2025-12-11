"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  FileCheck2,
  Clock4,
  Handshake,
  MapPin,
  Phone,
  Mail,
  Award,
  Briefcase,
  ClipboardCheck,
  Scale,
  Gavel,
  Stethoscope,
  Cpu,
  Bot,
  Zap,
  Quote, // Added for the motivational section
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/* ----------------------------- Anim helpers ----------------------------- */
const container = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, duration: 0.5 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

/* ========================= ADDRESS ESTIMATOR ========================= */
function AddressEstimator() {
  const router = useRouter();
  const [ptype, setPtype] = useState<"residential" | "commercial">("residential");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAction() {
    if (!address) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/contact");
    }, 800);
  }

  return (
    <div className="rounded-2xl border bg-white/90 p-4 shadow-sm backdrop-blur">
      <div className="mb-2 flex gap-2">
        {(["residential", "commercial"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setPtype(t)}
            className={`rounded-full border px-3 py-1 text-sm ${
              ptype === t ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        <input
          placeholder="Enter address to start..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 sm:col-span-2"
        />
        <Button onClick={handleAction} className="rounded-lg">
          {loading ? "Analyzing..." : "Check Savings"}
        </Button>
      </div>
    </div>
  );
}

/* ================================== HERO ================================== */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden pt-6 md:pt-8">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=2000&auto=format&fit=crop"
          alt="Attorney meeting reviewing documents"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/55 to-white/30" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/85 to-transparent" />
      </div>

      {/* MAIN */}
      <motion.div
        style={{ y }}
        className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-3 pb-8 md:grid-cols-2 md:gap-8 md:px-6 md:pb-10"
      >
        {/* LEFT */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="mb-2 text-sm font-medium text-indigo-600 md:text-[15px]">
            You only pay when we save you money
          </motion.p>

          <motion.h1
            variants={item}
            className="font-serif text-[34px] leading-tight text-slate-900 md:text-5xl"
          >
            Expert Negotiators. Real Savings.
          </motion.h1>

          <motion.p variants={item} className="mt-2 max-w-lg text-[15px] text-slate-700 md:mt-3 md:text-lg">
            We cut medical bills, reduce property taxes, and resolve collections—backed by transparent
            fees and a results-first mindset.
          </motion.p>

          <motion.div variants={item} className="mt-4 flex flex-wrap gap-3">
            <Button asChild className="rounded-full px-6">
              <Link href="/contact">
                Book Free Consult <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="rounded-full">
              <Link href="/services">Explore Services</Link>
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-4 max-w-lg">
            <AddressEstimator />
          </motion.div>

          <motion.div
            variants={item}
            className="mt-5 grid w-full max-w-lg grid-cols-2 gap-3 text-sm text-slate-700"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-indigo-600" /> No upfront fees
            </div>
            <div className="flex items-center gap-2">
              <FileCheck2 className="h-5 w-5 text-indigo-600" /> HIPAA / PCI aware
            </div>
            <div className="flex items-center gap-2">
              <Clock4 className="h-5 w-5 text-indigo-600" /> Fast resolution
            </div>
            <div className="flex items-center gap-2">
              <Handshake className="h-5 w-5 text-indigo-600" /> Success-based
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative h-[340px] w-full overflow-hidden rounded-2xl shadow-lg md:h-[420px]"
        >
          <Image
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1500&auto=format&fit=crop"
            alt="Signing a contract during consultation"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/65 via-slate-900/20 to-transparent" />
          <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-4 py-2 shadow-sm backdrop-blur">
            <p className="text-xs text-slate-600">Our brand vision</p>
            <p className="font-serif text-lg text-slate-900">Relentless advocacy. Transparent results.</p>
          </div>
        </motion.div>
      </motion.div>

      {/* TRUST STRIP */}
      <div className="border-t">
        <div className="mx-auto max-w-6xl px-3 md:px-6">
          <div className="my-3 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50">
                <Award className="h-4 w-4 text-indigo-600" />
              </span>
              Top-rated client satisfaction
            </div>

            <div className="hidden h-6 w-px shrink-0 bg-slate-200 sm:block" />

            <div className="flex items-center gap-2 text-sm text-slate-700">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50">
                <Briefcase className="h-4 w-4 text-indigo-600" />
              </span>
              Corporate &amp; individual matters
            </div>

            <div className="hidden h-6 w-px shrink-0 bg-slate-200 sm:block" />

            <div className="flex items-center gap-2 text-sm text-slate-700">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50">
                <Bot className="h-4 w-4 text-indigo-600" />
              </span>
              AI-driven case analysis
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* =================== SERVICES: MANUAL CAROUSEL =================== */
const SERVICES = [
  {
    icon: <Gavel className="h-6 w-6" />,
    title: "Credit Card Debt & Collections",
    desc: "Dispute inaccuracies, stop harassment, negotiate pay-for-delete when viable.",
    href: "/services/collections",
    bullets: ["FDCPA/FCRA leverage", "Charge-off settlements", "Credit repair path"],
  },
  {
    icon: <Scale className="h-6 w-6" />,
    title: "Property Tax Appeals",
    desc: "Valuation analysis, comps, and hearing prep to reduce assessed value fast.",
    href: "/services/property-tax",
    bullets: ["Aggressive comps", "Hearing representation", "Annual re-checks"],
  },
  {
    icon: <Stethoscope className="h-6 w-6" />,
    title: "Medical Bills & Healthcare",
    desc: "Audit CPT codes, catch duplicates & denials, negotiate direct with providers.",
    href: "/services/medical-bills",
    bullets: ["CPT/HCPCS review", "Financial assistance routing", "Provider negotiations"],
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Business Counsel",
    desc: "Entity formation, operating agreements, and general counsel for startups.",
    href: "/services/business",
    bullets: ["Entity setup", "Cap table basics", "Outside GC retainer"],
  },
  {
    icon: <Handshake className="h-6 w-6" />,
    title: "Mediation & Dispute Resolution",
    desc: "Pragmatic settlements that save time, money, and relationships.",
    href: "/services/mediation",
    bullets: ["Neutral facilitation", "Confidential process", "Cost control"],
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Regulatory & Compliance",
    desc: "Policies, training, and risk-based programs for modern businesses.",
    href: "/services/compliance",
    bullets: ["HIPAA/PCI aware", "Policy drafting", "Staff training"],
  },
];

function ServicesSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === "left" ? -350 : 350;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-3 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker text-indigo-600">What we do</p>
          <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">Discover our services</h2>
          <p className="mt-3 text-slate-600">Precise analysis. Aggressive negotiation. Ethical practice.</p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> No upfront fees
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1">
              <FileCheck2 className="h-3.5 w-3.5 text-indigo-600" /> HIPAA / PCI aware
            </span>
          </div>
        </div>

        <div className="relative mx-auto mt-8">
          <div className="absolute -top-14 right-0 hidden gap-2 sm:flex">
            <button
              onClick={() => scroll("left")}
              className="rounded-full border bg-white p-2 shadow-sm transition hover:bg-slate-50 active:scale-95"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5 text-slate-700" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-full border bg-white p-2 shadow-sm transition hover:bg-slate-50 active:scale-95"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5 text-slate-700" />
            </button>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-3 px-3 md:mx-0 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
          >
            {SERVICES.map((s, idx) => (
              <article 
                key={idx} 
                className="w-[85vw] shrink-0 snap-center sm:w-[350px] md:w-[380px]"
              >
                <div className="flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    {s.icon}
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-slate-900">{s.title}</h3>
                  <p className="mt-2 flex-grow text-sm text-slate-600">{s.desc}</p>
                  
                  {s.bullets && (
                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      {s.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="mt-6 pt-4 border-t border-slate-50">
                    <Link href={s.href} className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700">
                      Learn more <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Button asChild className="rounded-full px-6">
              <Link href="/services">See all services</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link href="/contact">Get help</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ============================ RESULTS STRIP ============================ */
const IMPACTS = [
  "Medical bill reduction verified",
  "Commercial property tax win",
  "Collections fees removed",
  "Hospital overcharge reversal",
  "Residential property appeal success",
  "Debt settlement negotiated",
  "Tax assessment reduced",
];

function Marquee() {
  return (
    <div className="relative overflow-hidden">
      <div className="animate-[marquee_22s_linear_infinite] whitespace-nowrap py-2 text-sm text-slate-600 [--gap:3rem]">
        {[...IMPACTS, ...IMPACTS].map((t, i) => (
          <span key={i} className="mx-[--gap] inline-flex items-center">
            <ClipboardCheck className="mr-2 h-4 w-4 text-emerald-600" /> {t}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function ResultsStrip() {
  return (
    <section className="relative isolate bg-slate-900 py-16 text-slate-100">
      <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(60% 60% at 50% 0%, #4f46e5, transparent)" }} />
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-indigo-300">Our impact</p>
            <h2 className="font-serif text-3xl">Real wins our clients can feel</h2>
            <p className="mt-2 max-w-xl text-slate-300">
              We measure success in tangible savings and stress removed. Explore representative outcomes.
            </p>
          </div>
          {/* Removed Results Button */}
        </div>
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-2">
          <Marquee />
        </div>
      </div>
    </section>
  );
}

/* ================== WHY US ================== */
function WhyUs() {
  const points = [
    {
      icon: <Cpu className="h-5 w-5" />,
      title: "Data-Driven Precision",
      desc: "We use advanced algorithms to analyze tax codes, billing errors, and fair-market values instantly.",
    },
    {
      icon: <Handshake className="h-5 w-5" />,
      title: "Expert Human Advocacy",
      desc: "Technology finds the leverage; our experienced negotiators close the deal with empathy and firmness.",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Speed & Transparency",
      desc: "No black boxes. You see every step of the process via our secure portal, with faster resolutions.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker text-indigo-600">The Advantage</p>
          <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">Data-Driven Precision. Human Expertise.</h2>
          <p className="mt-4 text-slate-600">
            We blend cutting-edge financial analysis with seasoned legal and negotiation professionals to get results others miss.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {points.map((p, i) => (
            <Card key={i} className="group border-slate-200 transition-all hover:-translate-y-1 hover:shadow-md">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform">
                  {p.icon}
                </div>
                <h3 className="mb-2 text-xl font-medium text-slate-900">{p.title}</h3>
                <p className="text-slate-600 leading-relaxed">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================== FAQ =================================== */
function FAQSection() {
  const faqs = [
    {
      q: "Do I pay anything upfront?",
      a: "For savings matters (property tax, medical bill reductions, many collections) there are no upfront fees—our compensation comes from the savings we secure. Other engagements use transparent flat or clearly-scoped fees.",
    },
    {
      q: "Will this hurt my credit?",
      a: "Our approach is credit-aware. When supported by law and evidence we pursue deletions or corrected reporting. We never advise steps that jeopardize critical credit goals.",
    },
    {
      q: "Is my information secure?",
      a: "Yes. We use encrypted document intake, least-privilege access, and HIPAA/PCI-aware workflows.",
    },
    {
      q: "Can you work outside my state?",
      a: "We cover many U.S. markets directly and collaborate with local counsel when required by practice rules—seamlessly for you.",
    },
    {
      q: "What happens in the free case review?",
      a: "You share documents securely. We map savings/risk, timelines, and pricing options. You decide if/when to proceed—no pressure.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker text-indigo-600">Questions</p>
          <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">FAQ</h2>
        </div>
        <div className="mt-6 space-y-2">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="overflow-hidden rounded-xl border bg-white">
                <button className="flex w-full items-center justify-between px-4 py-3 text-left" onClick={() => setOpen(isOpen ? null : i)}>
                  <span className="font-medium text-slate-900">{f.q}</span>
                  {isOpen ? <ChevronLeft className="h-5 w-5 rotate-90 text-slate-500" /> : <ChevronRight className="h-5 w-5 text-slate-500" />}
                </button>
                {isOpen && <div className="px-4 pb-3 text-slate-600">{f.a}</div>}
              </div>
            );
          })}
        </div>
        <div className="mt-6 text-center">
          <Button asChild className="rounded-full">
            <Link href="/contact">Still have questions? Talk to us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ============================== CONTACT ============================== */
function ContactSection() {
  return (
    <section className="relative bg-white py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 md:grid-cols-2 md:px-6">
        <div>
          <p className="kicker text-indigo-600">Contact us</p>
          <h2 className="font-serif text-3xl text-slate-900">Have questions or ready to start saving?</h2>
          <p className="mt-3 text-slate-600">Reach out—no pressure, no upfront fees. Just honest guidance and real results.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Call</p>
              <a className="mt-1 block text-lg font-medium text-slate-900" href="tel:+13124889775">
                <span className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4 text-indigo-600" /> (312) 488-9775
                </span>
              </a>
              <p className="text-xs text-slate-500">Weekdays 9–6 (CT)</p>
            </div>
            <div className="rounded-2xl border bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Email</p>
              <a className="mt-1 block text-lg font-medium text-slate-900" href="mailto:info@cumberlandbrooks.com">
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4 text-indigo-600" /> info@cumberlandbrooks.com
                </span>
              </a>
              <p className="text-xs text-slate-500">Replies within 1 business day</p>
            </div>
            <div className="rounded-2xl border bg-slate-50 p-4 sm:col-span-2">
              <p className="text-sm text-slate-600">Office</p>
              <p className="mt-1 text-slate-900">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-indigo-600" /> 752 S. 6th St., Ste. R, Las Vegas, NV 89101
                </span>
              </p>
              <p className="text-xs text-slate-500">By appointment only</p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button asChild className="rounded-full">
              <Link href="/contact">Open contact page</Link>
            </Button>
            {/* Removed the "See results" button */}
          </div>
        </div>

        {/* Replaced Calendly with Motivational Quote Card */}
        <div className="flex h-full flex-col justify-center rounded-2xl border bg-slate-50 p-8 text-center shadow-sm">
          <Quote className="mx-auto h-12 w-12 text-indigo-200" />
          <blockquote className="mt-6 text-xl font-medium leading-relaxed text-slate-900 font-serif">
            "Justice consists not in being neutral between right and wrong, but in finding out the right and upholding it."
          </blockquote>
          <div className="mt-6 h-1 w-12 rounded-full bg-indigo-600 mx-auto" />
          <p className="mt-4 text-sm text-slate-600">We are ready to fight for your financial peace of mind.</p>
        </div>
      </div>
    </section>
  );
}

/* ========================= STICKY CTA ========================= */
function StickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-3" role="region" aria-label="Quick actions">
      <div className="flex w-full max-w-3xl items-center justify-between gap-3 rounded-full border bg-white/90 p-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="px-3 text-sm text-slate-700">No upfront fees. Average resolution in weeks.</div>
        <div className="flex items-center gap-2">
          <a
            href="tel:+13124889775"
            className="hidden rounded-full border px-4 py-2 text-sm text-slate-800 transition-colors hover:bg-slate-50 sm:block"
            aria-label="Call (312) 488-9775"
          >
            (312) 488-9775
          </a>
          <Button asChild className="rounded-full">
            <Link href="/contact">Book Free Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ================================= PAGE ================================= */
export default function Page() {
  return (
    <main className="text-slate-800">
      <Hero />
      <ServicesSlider />
      <ResultsStrip />
      <WhyUs />
      <FAQSection />
      <ContactSection />
      <StickyCTA />
    </main>
  );
}