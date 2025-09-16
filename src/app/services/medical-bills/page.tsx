export default function MedicalBills() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <h1 className="font-serif text-3xl">Medical Bills & Healthcare Costs</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        We find coding errors, duplicate charges, and insurer misapplies; then negotiate reductions.
      </p>
      <ul className="mt-6 grid gap-3 text-slate-700">
        <li>• Itemized bill audit (CPT/HCPCS/REV codes)</li>
        <li>• Provider & payer negotiations</li>
        <li>• Transparent, results-based pricing</li>
      </ul>
      <a className="mt-8 inline-block rounded-full bg-slate-900 px-5 py-2 text-white" href="/book">Book Free Consultation</a>
    </section>
  );
}
