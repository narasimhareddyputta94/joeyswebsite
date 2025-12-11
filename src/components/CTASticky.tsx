"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASticky() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Show after scrolling down 500px
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Measure height and set CSS variable so the Footer can reserve space
  useEffect(() => {
    if (!show) {
      document.documentElement.style.removeProperty("--sticky-offset");
      document.documentElement.classList.remove("has-sticky");
      return;
    }
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const h = el.offsetHeight + 16; // Add a bit of gap for shadow/spacing
      document.documentElement.style.setProperty("--sticky-offset", `${h}px`);
      document.documentElement.classList.add("has-sticky");
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);

    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      document.documentElement.style.removeProperty("--sticky-offset");
      document.documentElement.classList.remove("has-sticky");
    };
  }, [show]);

  if (!show) return null;

  return (
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
          <Button asChild className="rounded-full">
            <Link href="/contact">Book Free Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}