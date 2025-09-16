const cases = [
  { k: "$88,400", t: "Medical bill reduction", blurb: "Coding errors + duplicate charges removed; negotiated provider discount." },
  { k: "$41,200", t: "Commercial property tax win", blurb: "CAP rate adjustment + comps package persuaded board at hearing." },
  { k: "$9,900", t: "Collections fees removed", blurb: "Validation failed; tradeline deleted and fees waived." },
];

export default function ResultsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <h1 className="font-serif text-4xl text-slate-900">Client Results</h1>
      <p className="mt-3 max-w-3xl text-slate-600">Recent anonymized outcomes across practice areas.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {cases.map((c, i) => (
          <div key={i} className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-2xl font-semibold text-emerald-600">{c.k}</p>
            <p className="mt-1 font-medium text-slate-900">{c.t}</p>
            <p className="mt-2 text-sm text-slate-600">{c.blurb}</p>
          </div>
        ))}
      </div>
      <a className="mt-10 inline-block rounded-full bg-slate-900 px-5 py-2 text-white" href="/book">Start your case</a>
    </section>
  );
}
