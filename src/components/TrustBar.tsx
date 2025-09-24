"use client";

import {
  FileCheck2,
  Clock4,
  MapPin,
  UploadCloud,
  Banknote,
  Star,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";

export default function TrustBar() {
  return (
    <div
      // sticks right under a fixed navbar that's ~56px tall (h-14)
      className="sticky top-14 z-40 border-b bg-indigo-600/95 text-white backdrop-blur supports-[backdrop-filter]:bg-indigo-600/75"
      aria-label="Helpful customer info and getting-started tips"
    >
      <div className="relative overflow-hidden">
        {/* marquee track (duplicated for seamless loop) */}
        <div className="marquee-track flex w-max gap-12 py-2 pl-6 pr-12">
          <Item icon={<FileCheck2 className="h-4 w-4" />}>
            Free case review — upload docs, get options in writing
          </Item>
          <Item icon={<Clock4 className="h-4 w-4" />}>
            Same-business-day response on weekday submissions before 3pm
          </Item>
          <Item icon={<MapPin className="h-4 w-4" />}>
            Service coverage: NV • IL • CA • TX (with local counsel as needed)
          </Item>
          <Item icon={<UploadCloud className="h-4 w-4" />}>
            Secure upload portal — encrypted in transit
          </Item>
          <Item icon={<Banknote className="h-4 w-4" />}>
            Clear pricing: success-based, flat-fee, or scoped — you choose
          </Item>
          <Item icon={<Star className="h-4 w-4" />}>
            See wins & testimonials → <a className="underline underline-offset-2" href="/results">Results</a>
          </Item>
          <Item icon={<MessageSquare className="h-4 w-4" />}>
            Prefer texting? Ask for our SMS intake link on the consult
          </Item>
          <Item icon={<Mail className="h-4 w-4" />}>
            Email: <a className="underline underline-offset-2" href="mailto:info@cumberlandbrooks.com">info@cumberlandbrooks.com</a>
          </Item>
          <Item icon={<Phone className="h-4 w-4" />}>
            Call: <a className="underline underline-offset-2" href="tel:+13124889775">(312) 488-9775</a>
          </Item>

          {/* duplicate for infinite scroll */}
          <Item icon={<FileCheck2 className="h-4 w-4" />}>
            Free case review — upload docs, get options in writing
          </Item>
          <Item icon={<Clock4 className="h-4 w-4" />}>
            Same-business-day response on weekday submissions before 3pm
          </Item>
          <Item icon={<MapPin className="h-4 w-4" />}>
            Service coverage: NV • IL • CA • TX (with local counsel as needed)
          </Item>
          <Item icon={<UploadCloud className="h-4 w-4" />}>
            Secure upload portal — encrypted in transit
          </Item>
          <Item icon={<Banknote className="h-4 w-4" />}>
            Clear pricing: success-based, flat-fee, or scoped — you choose
          </Item>
          <Item icon={<Star className="h-4 w-4" />}>
            See wins & testimonials → <a className="underline underline-offset-2" href="/results">Results</a>
          </Item>
          <Item icon={<MessageSquare className="h-4 w-4" />}>
            Prefer texting? Ask for our SMS intake link on the consult
          </Item>
          <Item icon={<Mail className="h-4 w-4" />}>
            Email: <a className="underline underline-offset-2" href="mailto:info@cumberlandbrooks.com">info@cumberlandbrooks.com</a>
          </Item>
          <Item icon={<Phone className="h-4 w-4" />}>
            Call: <a className="underline underline-offset-2" href="tel:+13124889775">(312) 488-9775</a>
          </Item>
        </div>
      </div>

      {/* local styles for marquee */}
      <style jsx>{`
        .marquee-track {
          animation: marquee 40s linear infinite;
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
