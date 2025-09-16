"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2, DollarSign, ShieldCheck } from "lucide-react";

type Est = {
  addressNormalized: string;
  inputs: { marketValue: number; assessedValue: number; taxRate: number; propertyType: "residential"|"commercial" };
  estimatedSavings: number;
  breakdown: { potentialReduction: number; expectedReduction: number; winProbability: number; targetRatio: number };
  disclaimer: string;
};

export default function AddressEstimator() {
  const [ptype, setPtype] = useState<"residential"|"commercial">("residential");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Est | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState("");

  // Google Places Autocomplete
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!key || !inputRef.current) return;
    const loader = new Loader({ apiKey: key, libraries: ["places"] });
    loader.load().then(() => {
      const ac = new google.maps.places.Autocomplete(inputRef.current!, {
        types: ["address"],
        fields: ["formatted_address"],
      });
      ac.addListener("place_changed", () => {
        const p = ac.getPlace();
        setAddress(p?.formatted_address || inputRef.current!.value);
      });
    });
  }, []);

  async function handleEstimate() {
    if (!address) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const r = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, propertyType: ptype }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Failed");
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="mb-3 flex gap-2">
        {(["residential","commercial"] as const).map(t => (
          <button
            key={t}
            onClick={() => setPtype(t)}
            className={`rounded-full border px-3 py-1 text-sm ${ptype===t ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-700 hover:bg-slate-50"}`}
          >
            {t[0].toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex w-full items-stretch gap-2 rounded-full border bg-white p-1 shadow-md">
        <div className="flex items-center pl-3 text-slate-500">
          <MapPin className="h-5 w-5" />
        </div>
        <input
          ref={inputRef}
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
          placeholder="Enter address"
          className="w-full rounded-full px-3 py-3 outline-none"
        />
        <Button onClick={handleEstimate} className="rounded-full px-5">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Get Savings Estimate"}
        </Button>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {result && (
        <div className="mt-4 rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">{result.addressNormalized}</p>
          <div className="mt-2 flex items-end gap-3">
            <DollarSign className="h-10 w-10 text-emerald-600" />
            <div>
              <p className="text-3xl font-semibold text-emerald-700">
                ~${result.estimatedSavings.toLocaleString()} / yr
              </p>
              <p className="text-sm text-slate-600">Estimated property tax savings</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
            <div className="rounded-xl border bg-slate-50 p-3">
              <p className="text-slate-500">Assessed value</p>
              <p className="font-medium">${Math.round(result.inputs.assessedValue).toLocaleString()}</p>
            </div>
            <div className="rounded-xl border bg-slate-50 p-3">
              <p className="text-slate-500">Market value</p>
              <p className="font-medium">${Math.round(result.inputs.marketValue).toLocaleString()}</p>
            </div>
            <div className="rounded-xl border bg-slate-50 p-3">
              <p className="text-slate-500">Tax rate</p>
              <p className="font-medium">{(result.inputs.taxRate*100).toFixed(2)}%</p>
            </div>
          </div>

          <div className="mt-3 text-xs text-slate-500">{result.disclaimer}</div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
              <ShieldCheck className="h-4 w-4" /> No upfront fees
            </span>
            <a href="/book">
              <Button className="rounded-full">Book Free Consultation</Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
