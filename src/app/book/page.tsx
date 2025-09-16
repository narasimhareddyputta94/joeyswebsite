export default function BookPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24">
      <h1 className="font-serif text-4xl">Book a Free Consultation</h1>
      <p className="mt-3 text-slate-600">Pick a time that works for you. No obligation.</p>
      <div className="mt-6 rounded-xl border bg-white p-2 shadow-sm">
        <iframe
          title="booking"
          src="https://calendly.com/your-handle/30min?hide_landing_page_details=1&hide_event_type_details=1"
          className="h-[70vh] w-full rounded-md"
        />
      </div>
      <p className="mt-3 text-sm text-slate-500">Prefer a call? <a className="underline" href="tel:+13124889775">(312) 488-9775</a></p>
    </section>
  );
}
