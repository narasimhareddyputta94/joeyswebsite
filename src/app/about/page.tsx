// src/app/about/page.tsx
import AboutClient from "./AboutClient";

export const metadata = {
  title: "About — Cumberland Brooks, LLC",
  description:
    "Relentless advocacy. Transparent results. Learn how Cumberland Brooks, LLC delivers real savings with no upfront fees.",
};

export default function AboutPage() {
  // Server component (no "use client" here)
  return <AboutClient />;
}
