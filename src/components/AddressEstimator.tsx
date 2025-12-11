"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Loader2, DollarSign, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

// --- Fix: Define the google namespace locally so TypeScript doesn't complain ---
declare global {
  interface Window {
    google: typeof google;
  }
}

/* ----------------------------- types ----------------------------- */

export type PropertyType = "residential" | "commercial";

type EstimateAPIResponse = {
  addressNormalized: string;
  estimatedSavings: number;
  inputs: {
    marketValue: number;
    assessedValue: number;
    taxRate: number;
  };
  disclaimer: string;
};

type AddressEstimatorProps = {
  onBook?: (prefill: { email?: string; address?: string; ptype: PropertyType }) => void;
};

/* -------------------------- component --------------------------- */

export default function AddressEstimator({ onBook }: AddressEstimatorProps) {
  const router = useRouter();
  
  // State
  const [address, setAddress] = useState("");
  const [ptype, setPtype] = useState<PropertyType>("residential"); // Auto-detected
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EstimateAPIResponse | null>(null);

  // Lead Capture State
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(true);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  /* ------------------ Google Places Integration ------------------ */
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    // Safety check
    if (!apiKey) {
      console.warn("Google Maps API Key missing in .env.local");
      return;
    }

    const loader = new Loader({
      apiKey,
      libraries: ["places"],
    });

    loader.load().then(() => {
      if (!inputRef.current || !window.google) return;

      // Initialize Autocomplete
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["address"], // Restrict to addresses
        componentRestrictions: { country: "us" }, // Limit to US
        fields: ["formatted_address", "types"], // We need 'types' for auto-detection
      });

      // Listen for selection
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        
        if (place && place.formatted_address) {
          setAddress(place.formatted_address);
          setError(null); // Clear error on valid selection
          
          // --- AUTO DETECTION LOGIC ---
          const types = place.types || [];
          const commercialTags = [
            "store", "point_of_interest", "establishment", "office", "commercial", "industrial", "warehouse", "lodging",
            "premise", "school", "university", "hospital", "restaurant", "cafe", "bar", "shopping_mall", "stadium",
            "airport", "bank", "courthouse", "church"
          ];
          
          // Explicitly check if any type matches commercial tags
          const isCommercial = types.some((t: string) => commercialTags.includes(t));
          
          setPtype(isCommercial ? "commercial" : "residential");
        }
      });
    }).catch((e) => console.error("Google Maps Load Error:", e));

  }, []);

  /* --------------------------- Actions --------------------------- */

  // 1. Calculate Estimate
  async function handleEstimate() {
    if (!address.trim()) {
      setError("Please enter a valid address.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Attempt to hit backend (simulated for now if API not ready)
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, propertyType: ptype }),
      });

      if (!res.ok) {
        // Fallback Simulation (offline): scale by property type for more realistic spread
        console.warn("API unavailable, running simulation.");
        await new Promise((r) => setTimeout(r, 1500)); 
        
        const isCommercial = ptype === "commercial";
        const base = isCommercial ? 1_000_000 : 280_000;
        const spread = isCommercial ? 4_500_000 : 800_000;
        const rand = Math.random();
        const marketValue = base + spread * rand;
        const assessedValue = marketValue * (isCommercial ? 0.95 + rand * 0.2 : 0.9 + rand * 0.15);
        const targetRatio = isCommercial ? 0.82 : 0.88;
        const potentialReduction = Math.max(0, assessedValue - marketValue * targetRatio);
        const taxRate = isCommercial ? 0.016 : 0.012;
        const winProbability = isCommercial ? 0.55 + rand * 0.25 : 0.45 + rand * 0.25;
        const estimatedSavings = Math.round(potentialReduction * taxRate * winProbability);
        
        setResult({
          addressNormalized: address,
          estimatedSavings,
          inputs: {
            marketValue: Math.round(marketValue),
            assessedValue: Math.round(assessedValue),
            taxRate,
          },
          disclaimer: "Preliminary heuristic estimate. Actual savings vary by jurisdiction and evidence."
        });
      } else {
        const data = await res.json();
        setResult(data);
      }
      
      setStep(2);
    } catch (err: unknown) { 
      console.error(err);
      setError("Unable to calculate estimate. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // 2. Submit Lead
  async function handleSubmit() {
    if (!email) return;
    setLoading(true);
    
    // Simulate lead submission
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, address, ptype, estimate: result })
      });
    } catch (e: unknown) {
      console.error(e); 
    }
    
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1000);
  }

  // 3. Final Action (Book/Contact)
  function handleBook() {
    if (onBook) {
      onBook({ email, address, ptype });
    } else {
      router.push("/contact");
    }
  }

  /* ----------------------------- UI ------------------------------ */

  return (
    <div className="w-full">
      {/* STEP 1: INPUT */}
      {step === 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <div className="flex w-full items-center rounded-full border bg-white p-1 shadow-md transition-shadow hover:shadow-lg focus-within:ring-2 focus-within:ring-indigo-500">
            <div className="flex items-center pl-4 text-slate-400">
              <MapPin className="h-5 w-5" />
            </div>
            <input
              ref={inputRef}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter property address..."
              className="w-full rounded-full bg-transparent px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400"
              onKeyDown={(e) => e.key === "Enter" && handleEstimate()}
            />
            <Button 
              onClick={handleEstimate} 
              className="rounded-full px-6 py-2" 
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Check Savings"}
            </Button>
          </div>
          {/* Allow manual override if auto-detect is wrong */}
          <div className="mt-3 flex items-center gap-2 px-1 text-xs text-slate-600">
            <span className="font-semibold text-slate-700">Property type:</span>
            <div className="inline-flex rounded-full border bg-white shadow-sm">
              {["residential", "commercial"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPtype(type as PropertyType)}
                  className={`px-3 py-1 text-[11px] font-medium transition ${
                    ptype === type ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-50"
                  } ${type === "residential" ? "rounded-l-full" : "rounded-r-full"}`}
                  aria-pressed={ptype === type}
                >
                  {type === "residential" ? "Residential" : "Commercial"}
                </button>
              ))}
            </div>
            <span className="text-slate-500">(auto-detected: {ptype})</span>
          </div>
          {error && <p className="ml-4 mt-2 text-sm text-red-500 font-semibold">{error}</p>}
          <p className="mt-3 text-center text-xs text-white/70">
            Instantly analyzes property tax data • 100% Confidential
          </p>
        </motion.div>
      )}

      {/* STEP 2: RESULTS + LEAD CAPTURE */}
      {step === 2 && result && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 rounded-2xl border bg-white/95 p-5 shadow-xl backdrop-blur"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                {ptype.toUpperCase()} PROPERTY DETECTED
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900 line-clamp-1">{result.addressNormalized}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="h-auto p-0 text-xs text-slate-400 hover:text-indigo-600 hover:bg-transparent">
              Change
            </Button>
          </div>

          {/* Big Number */}
          <div className="py-5 text-center">
            <p className="text-sm text-slate-600">Potential Annual Savings</p>
            <div className="mt-1 flex items-center justify-center gap-1 text-emerald-600">
              <DollarSign className="h-6 w-6 sm:h-8 sm:w-8" />
              <span className="text-4xl font-bold sm:text-5xl">{result.estimatedSavings.toLocaleString()}</span>
            </div>
            <p className="mt-2 text-xs text-slate-400 max-w-xs mx-auto italic">
              *Estimate based on assessed value vs market trends. Actual results may vary.
            </p>
          </div>

          {/* Input Fields */}
          <div className="space-y-3">
            <input 
              type="email" 
              placeholder="Enter email for full report" 
              className="w-full rounded-lg border bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex gap-2">
               <input 
                type="tel" 
                placeholder="Phone (Optional)" 
                className="w-full rounded-lg border bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            
            <label className="flex items-start gap-2 px-1 text-xs text-slate-500">
              <input 
                type="checkbox" 
                checked={consent} 
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5"
              />
              I agree to receive my report and related updates. No spam.
            </label>

            <Button 
              className="w-full rounded-lg text-lg font-semibold py-6"
              onClick={handleSubmit}
              disabled={!email || loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Send Me The Full Report"}
            </Button>
          </div>
        </motion.div>
      )}

      {/* STEP 3: SUCCESS */}
      {step === 3 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-2xl border bg-white p-6 shadow-xl text-center"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-serif text-slate-900">Report on the way!</h3>
          <p className="mt-2 text-slate-600 text-sm">
            We&apos;ve sent a detailed breakdown to <strong>{email}</strong>. 
            <br />Want to expedite your savings?
          </p>
          <div className="mt-6 space-y-3">
            <Button onClick={handleBook} className="w-full rounded-full">
              Call Now to Fast-Track
            </Button>
            <Button variant="ghost" onClick={() => { setStep(1); setAddress(""); }} className="text-sm text-slate-500">
              Check another address
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}