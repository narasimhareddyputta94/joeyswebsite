"use client";

import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookDrawer from "@/components/BookDrawer";

export default function CTASticky() {
  const [show, setShow] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [prefill, setPrefill] = useState<{
    name?: string;
    email?: string;
    address?: string;
    ptype?: "residential" | "commercial";
  }>();
  const ref = useRef<HTMLDivElement>(null);

  // show after scroll
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // measure height and set CSS var so layout can reserve space
  useEffect(() => {
    if (!show) {
      document.documentElement.style.removeProperty("--sticky-offset");
      document.documentElement.classList.remove("has-sticky");
      return;
    }
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const h = el.offsetHeight + 16; // add a bit of gap for shadow
      document.documentElement.style.setProperty("--sticky-offset", `${h}px`);
      document.documentElement.classList.add("has-sticky");
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);

    // update on viewport changes too
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      document.documentElement.style.removeProperty("--sticky-offset");
      document.documentElement.classList.remove("has-sticky");
    };
  }, [show]);

  // 🔗 Listen for global "open-book" (from navbar or anywhere) and open this drawer
  useEffect(() => {
    const handler = (e: Event) => {
      if (typeof (e as any).preventDefault === "function") {
        (e as any).preventDefault(); // cancel any fallback like opening a new tab
      }
      const detail = (e as CustomEvent).detail as typeof prefill | undefined;
      if (detail) setPrefill(detail);
      setDrawer(true);
    };
    window.addEventListener("open-book", handler as EventListener);
    return () => window.removeEventListener("open-book", handler as EventListener);
  }, []);

  if (!show) return null;

  return (
    <>
      <div
        ref={ref}
        className="fixed inset-x-3 bottom-3 z-50 flex justify-center"
        role="region"
        aria-label="Quick actions"
      >
        <div className="flex w-full max-w-3xl items-center justify-between gap-3 rounded-full border bg-white/90 p-2 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="px-3 text-sm text-slate-700">
            No upfront fees. Average resolution in weeks.
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:+13124889775"
              className="hidden rounded-full border px-4 py-2 text-sm text-slate-800 transition-colors hover:bg-slate-50 sm:block"
              aria-label="Call (312) 488-9775"
            >
              <span className="inline-flex items-center gap-1">
                <Phone className="h-4 w-4" /> (312) 488-9775
              </span>
            </a>
            <Button onClick={() => setDrawer(true)} className="rounded-full">
              Book Free Consultation
            </Button>
          </div>
        </div>
      </div>

      <BookDrawer open={drawer} onOpenChange={setDrawer} prefill={prefill} />
    </>
  );
}
