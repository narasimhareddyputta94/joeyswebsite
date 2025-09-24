"use client";

import { ShieldCheck, Gauge, Sparkles, Phone } from "lucide-react";

export default function TrustBar() {
  return (
    <div
      // sticks right under a fixed navbar that's ~56px tall (h-14)
      className="sticky top-14 z-40 border-b bg-indigo-600/95 text-white backdrop-blur supports-[backdrop-filter]:bg-indigo-600/75"
      aria-label="Firm assurances and service highlights"
    >
      <div className="relative overflow-hidden">
        {/* marquee track (duplicated for seamless loop) */}
        <div className="marquee-track flex w-max gap-12 py-2 pl-6 pr-12">
          <Item icon={<ShieldCheck className="h-4 w-4" />}>
            No upfront fees — you pay from savings
          </Item>
          <Item icon={<Gauge className="h-4 w-4" />}>Avg. kickoff in ~1 week</Item>
          <Item icon={<Sparkles className="h-4 w-4" />}>HIPAA/PCI-aware intake</Item>
          <Item icon={<Phone className="h-4 w-4" />}>
            Questions? <a className="underline underline-offset-2" href="tel:+13124889775">(312) 488-9775</a>
          </Item>

          {/* duplicate for infinite scroll */}
          <Item icon={<ShieldCheck className="h-4 w-4" />}>
            No upfront fees — you pay from savings
          </Item>
          <Item icon={<Gauge className="h-4 w-4" />}>Avg. kickoff in ~1 week</Item>
          <Item icon={<Sparkles className="h-4 w-4" />}>HIPAA/PCI-aware intake</Item>
          <Item icon={<Phone className="h-4 w-4" />}>
            Questions? <a className="underline underline-offset-2" href="tel:+13124889775">(312) 488-9775</a>
          </Item>
        </div>
      </div>

      {/* local styles for marquee */}
      <style jsx>{`
        .marquee-track {
          animation: marquee 20s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

function Item({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm leading-none">
      <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15 text-white">
        {icon}
      </span>
      <span className="opacity-95">{children}</span>
    </span>
  );
}
