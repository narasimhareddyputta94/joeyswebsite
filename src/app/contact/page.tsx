export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-24 md:grid-cols-2">
      <div>
        <h1 className="font-serif text-4xl">Contact us</h1>
        <p className="mt-3 text-slate-600">No pressure, no upfront fees — real guidance and results.</p>
        <div className="mt-6 space-y-3 text-slate-700">
          <p>📞 (312) 488-9775</p>
          <p>✉️ info@cumberlandbrooks.com</p>
          <p>📍 752 S. 6th St., Ste. R, Las Vegas, NV 89101</p>
        </div>
      </div>
      <form onSubmit={(e)=>e.preventDefault()} className="rounded-2xl border bg-slate-50/50 p-6 shadow-sm">
        <label className="text-sm text-slate-600">Name</label>
        <input className="mb-3 mt-1 w-full rounded-lg border px-3 py-2" />
        <label className="text-sm text-slate-600">Email</label>
        <input type="email" className="mb-3 mt-1 w-full rounded-lg border px-3 py-2" />
        <label className="text-sm text-slate-600">Message</label>
        <textarea rows={5} className="mb-4 mt-1 w-full rounded-lg border px-3 py-2" />
        <button className="rounded-full bg-slate-900 px-5 py-2 text-white">Send</button>
      </form>
    </section>
  );
}
