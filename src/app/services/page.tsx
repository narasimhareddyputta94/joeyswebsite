export default function ServicesPage() {
  const services = [
    { href: "/services/collections", title: "Credit Card Debt & Collections", blurb: "Dispute inaccuracies, cut fees, stop aggressive collectors." },
    { href: "/services/property-tax", title: "Property Tax Appeals (Resi & Commercial)", blurb: "Valuation, appeal filings, hearings — end-to-end." },
    { href: "/services/medical-bills", title: "Medical Bills & Healthcare Costs", blurb: "Audit errors/overcharges; negotiate with providers." },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <h1 className="font-serif text-4xl text-slate-900">Services</h1>
      <p className="mt-3 max-w-3xl text-slate-600">No upfront fees. You pay only from savings we achieve.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {services.map((s) => (
          <a key={s.href} href={s.href} className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md">
            <h3 className="font-serif text-xl text-slate-900">{s.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{s.blurb}</p>
            <span className="mt-3 inline-block text-indigo-600">Learn more →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
