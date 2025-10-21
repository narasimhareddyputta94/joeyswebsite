// src/components/AddressEstimator.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Loader2, DollarSign, ShieldCheck } from "lucide-react";

/* ----------------------------- types ----------------------------- */

type PropertyType = "residential" | "commercial";

type EstimateInputs = {
  marketValue: number;
  assessedValue: number;
  taxRate: number;
};

type EstimateAPIResponse = {
  addressNormalized: string;
  estimatedSavings: number;
  inputs: EstimateInputs;
  disclaimer: string;
};

type BookPrefill = {
  email?: string;
  address?: string;
  name?: string;
  ptype: PropertyType;
};

type AddressEstimatorProps = {
  onBook: (prefill: BookPrefill) => void;
};

/** Minimal types for Google Places to avoid `any` and build-time `google` errors */
type GAutocomplete = {
  addListener: (event: "place_changed", handler: () => void) => void;
  getPlace: () => { formatted_address?: string };
};

type GPlaces = {
  Autocomplete: new (
    input: HTMLInputElement,
    opts: { types?: string[]; fields?: string[] }
  ) => GAutocomplete;
};

type GMaps = { places: GPlaces };
type GWindow = { google: { maps: GMaps } };

/* -------------------------- component --------------------------- */

export default function AddressEstimator({ onBook }: AddressEstimatorProps) {
  const [ptype, setPtype] = useState<PropertyType>("residential");
  const [address, setAddress] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [result, setResult] = useState<EstimateAPIResponse | null>(null);

  // lead fields
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(true);

  /* ------------------ Google Places Autocomplete ------------------ */
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!key || !inputRef.current) return;

    const loader = new Loader({ apiKey: key, libraries: ["places"] });
    let ac: GAutocomplete | undefined;

    loader
      .load()
      .then(() => {
        const gwin = (window as unknown as GWindow);
        if (!gwin?.google?.maps?.places || !inputRef.current) return;

        ac = new gwin.google.maps.places.Autocomplete(inputRef.current, {
          types: ["address"],
          fields: ["formatted_address"],
        });

        ac.addListener("place_changed", () => {
          const p = ac!.getPlace();
          const formatted = p?.formatted_address ?? inputRef.current!.value;
          setAddress(formatted);
        });
      })
      .catch(() => {
        // If the API fails to load, we simply fall back to manual typing.
      });

    return () => {
      // No explicit destroy method is provided; GC will collect listeners when the input unmounts.
      ac = undefined;
    };
  }, []);

  /* --------------------------- actions --------------------------- */

  async function estimate() {
    if (!address.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const r = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, propertyType: ptype }),
      });

      // Parse as unknown then narrow
      const data: unknown = await r.json();

      if (!r.ok) {
        const maybeErr = (data as { error?: string } | undefined)?.error;
        throw new Error(maybeErr || "Failed to estimate");
      }

      // Runtime narrow to our expected shape
      const safe = data as Partial<EstimateAPIResponse>;
      if (
        typeof safe?.addressNormalized !== "string" ||
        typeof safe?.estimatedSavings !== "number" ||
        !safe?.inputs ||
        typeof safe.inputs.marketValue !== "number" ||
        typeof safe.inputs.assessedValue !== "number" ||
        typeof safe.inputs.taxRate !== "number" ||
        typeof safe.disclaimer !== "string"
      ) {
        throw new Error("Unexpected response from server");
      }

      setResult(safe as EstimateAPIResponse);
      setStep(2);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function submitLead() {
    if (!email || !address) return;
    setLoading(true);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone,
          address,
          ptype,
          estimate: result,
          consent,
          middleName: "", // honeypot
        }),
      });

      setStep(3);
    } finally {
      setLoading(false);
    }
  }

  /* ----------------------------- UI ------------------------------ */

  return (
    <div className="w-full">
      {/* property tabs */}
      <div className="mb-2 flex gap-2">
        {(["residential", "commercial"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setPtype(t)}
            className={`rounded-full border px-3 py-1 text-sm ${
              ptype === t
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Step 1: address input */}
      {step === 1 && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full items-stretch gap-2 rounded-full border bg-white p-1 shadow-md"
          >
            <div className="flex items-center pl-3 text-slate-500">
              <MapPin className="h-5 w-5" />
            </div>
            <input
              ref={inputRef}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              className="w-full rounded-full px-3 py-3 outline-none"
              aria-label="Property address"
            />
            <Button onClick={estimate} className="rounded-full px-5" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Get Savings Estimate"}
            </Button>
          </motion.div>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </>
      )}

      {/* Step 2: estimate + lead capture */}
      {step === 2 && result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mt-3 rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">{result.addressNormalized}</p>

            <div className="mt-2 flex items-end gap-3">
              <DollarSign className="h-9 w-9 text-emerald-600" />
              <div>
                <p className="text-2xl font-semibold text-emerald-700">
                  ~${result.estimatedSavings.toLocaleString()} / yr
                </p>
                <p className="text-xs text-slate-600">Estimated property tax savings</p>
              </div>
            </div>

            <div className="mt-3 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
              <div className="rounded-xl border bg-slate-50 p-3">
                <p className="text-slate-500">Assessed value</p>
                <p className="font-medium">
                  ${Math.round(result.inputs.assessedValue).toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl border bg-slate-50 p-3">
                <p className="text-slate-500">Market value</p>
                <p className="font-medium">
                  ${Math.round(result.inputs.marketValue).toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl border bg-slate-50 p-3">
                <p className="text-slate-500">Tax rate</p>
                <p className="font-medium">{(result.inputs.taxRate * 100).toFixed(2)}%</p>
              </div>
            </div>

            <p className="mt-2 text-xs text-slate-500">{result.disclaimer}</p>

            {/* lead fields */}
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="sm:col-span-2 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border bg-white p-2">
                  <input
                    type="email"
                    placeholder="Email to send full report"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full outline-none"
                    aria-label="Email"
                  />
                </div>
                <div className="rounded-lg border bg-white p-2">
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full outline-none"
                    aria-label="Phone"
                  />
                </div>
                {/* Honeypot */}
                <input
                  type="text"
                  name="middleName"
                  style={{ display: "none" }}
                  onChange={() => {}}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <label className="col-span-2 mt-1 flex items-center gap-2 text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  I agree to be contacted about my estimate. No spam—just results.
                </label>
              </div>

              <div className="flex items-start justify-end">
                <Button
                  onClick={submitLead}
                  className="rounded-full px-5"
                  disabled={!email || loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Email me the full report"
                  )}
                </Button>
              </div>
            </div>

            {/* book now CTA */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
                <ShieldCheck className="h-4 w-4" /> No upfront fees
              </span>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => onBook({ email, address, ptype })}
              >
                Book Free Consultation
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 3: thanks → push to book */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mt-3 rounded-2xl border bg-white p-5 shadow-sm">
            <p className="font-serif text-lg">Report on the way ✅</p>
            <p className="mt-1 text-slate-600">Want to fast-track results? Book a free call.</p>
            <div className="mt-3 flex gap-2">
              <Button className="rounded-full" onClick={() => onBook({ email, address, ptype })}>
                Book Free Consultation
              </Button>
              <Button variant="outline" className="rounded-full" onClick={() => setStep(1)}>
                Check another address
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
