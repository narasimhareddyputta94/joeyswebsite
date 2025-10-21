"use client";
import { X } from "lucide-react";
import { useEffect, useMemo } from "react";

type Prefill = {
  name?: string;
  email?: string;
  address?: string; // custom question a1
  ptype?: "residential" | "commercial"; // custom question a2
};

export default function BookDrawer({
  open,
  onOpenChange,
  prefill,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  prefill?: Prefill;
}) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onOpenChange(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onOpenChange]);

  // Build Calendly URL with sane defaults + prefill
  const iframeSrc = useMemo(() => {
    // Use env if provided; otherwise fall back to the profile page (never 404s)
    const base =
      process.env.NEXT_PUBLIC_BOOKING_URL ??
      "https://calendly.com/narasimhareddyputta999";

    const url = new URL(base);
    // embed niceties
    url.searchParams.set("hide_gdpr_banner", "1");
    url.searchParams.set("background_color", "ffffff");

    // optional prefill (works if you later point to a specific event)
    if (prefill?.name) url.searchParams.set("name", prefill.name);
    if (prefill?.email) url.searchParams.set("email", prefill.email);
    if (prefill?.address) url.searchParams.set("a1", prefill.address);
    if (prefill?.ptype) url.searchParams.set("a2", prefill.ptype);

    return url.toString();
  }, [prefill]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => onOpenChange(false)}
      />
      <div
        className="absolute inset-y-0 right-0 w-full max-w-lg bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Book a Free Consultation"
      >
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-serif text-xl">Book a Free Consultation</h3>
          <button
            aria-label="Close"
            onClick={() => onOpenChange(false)}
            className="rounded-md p-1 hover:bg-slate-50"
          >
            <X />
          </button>
        </div>
        <div className="p-4">
          <iframe
            title="booking"
            src={iframeSrc}
            className="h-[70vh] w-full rounded-md border"
          />
          <p className="mt-3 text-xs text-slate-500">
            Prefer phone? Call{" "}
            <a href="tel:+13124889775" className="underline">
              (312) 488-9775
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
