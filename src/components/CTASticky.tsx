"use client";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookDrawer from "@/components/BookDrawer";

export default function CTASticky() {
  const [show, setShow] = useState(false);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-3">
        <div className="flex w-full max-w-3xl items-center justify-between gap-3 rounded-full border bg-white/90 p-2 shadow-lg backdrop-blur">
          <div className="px-3 text-sm text-slate-700">No upfront fees. Average resolution in weeks.</div>
          <div className="flex items-center gap-2">
            <a href="tel:+13124889775" className="hidden rounded-full border px-4 py-2 text-sm text-slate-800 hover:bg-slate-50 sm:block">
              <span className="inline-flex items-center gap-1"><Phone className="h-4 w-4" /> (312) 488-9775</span>
            </a>
            <Button onClick={() => setDrawer(true)} className="rounded-full">Book Free Consultation</Button>
          </div>
        </div>
      </div>
      <BookDrawer open={drawer} onOpenChange={setDrawer} />
    </>
  );
}
