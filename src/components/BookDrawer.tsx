"use client";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function BookDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void; }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onOpenChange(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange(false)} />
      <div className="absolute inset-y-0 right-0 w-full max-w-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-serif text-xl">Book a Free Consultation</h3>
          <button aria-label="Close" onClick={() => onOpenChange(false)}><X /></button>
        </div>
        <div className="p-4">
          {/* Calendly embed or your booking widget */}
          <iframe
            title="booking"
            src="https://calendly.com/your-handle/30min?hide_gdpr_banner=1&background_color=ffffff"
            className="h-[70vh] w-full rounded-md border"
          />
          <p className="mt-3 text-xs text-slate-500">Prefer phone? Call <a href="tel:+13124889775" className="underline">(312) 488-9775</a>.</p>
        </div>
      </div>
    </div>
  );
}
