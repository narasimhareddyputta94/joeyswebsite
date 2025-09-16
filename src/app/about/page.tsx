export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <h1 className="font-serif text-4xl">About Cumberland Brooks, LLC</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Our mission is simple: relentless advocacy, transparent results, and fair pricing with no upfront fees.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6"><h3 className="font-medium">Values</h3><p className="mt-2 text-sm">Fairness, precision, and clarity in every case.</p></div>
        <div className="rounded-2xl border bg-white p-6"><h3 className="font-medium">Process</h3><p className="mt-2 text-sm">Audit, strategy, negotiation, savings — clearly communicated.</p></div>
        <div className="rounded-2xl border bg-white p-6"><h3 className="font-medium">Security</h3><p className="mt-2 text-sm">HIPAA/PCI-aware workflows; encrypted document intake.</p></div>
      </div>
      <a className="mt-10 inline-block rounded-full bg-slate-900 px-5 py-2 text-white" href="/book">Book Free Consultation</a>
    </section>
  );
}
