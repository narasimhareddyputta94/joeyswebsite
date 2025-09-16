"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookDrawer from "@/components/BookDrawer";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/results", label: "Results" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "backdrop-blur bg-white/70 shadow-sm" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500" />
            <span className="font-serif text-xl tracking-tight text-slate-900">Cumberland Brooks, LLC</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className={`hover:text-slate-900 ${pathname?.startsWith(i.href) ? "text-slate-900 font-medium" : "text-slate-700"}`}
              >
                {i.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button className="rounded-full px-5" onClick={() => setDrawer(true)}>
              Book a Free Consultation
            </Button>
          </div>

          <button aria-label="Toggle menu" className="md:hidden" onClick={() => setOpen((s) => !s)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="border-t bg-white/90 px-4 py-3 md:hidden">
            <div className="flex flex-col gap-3">
              {nav.map((i) => (
                <Link key={i.href} href={i.href} onClick={() => setOpen(false)} className="text-slate-800">
                  {i.label}
                </Link>
              ))}
              <Button className="rounded-full" onClick={() => setDrawer(true)}>Free Consultation</Button>
            </div>
          </div>
        )}
      </div>
      <BookDrawer open={drawer} onOpenChange={setDrawer} />
    </>
  );
}
