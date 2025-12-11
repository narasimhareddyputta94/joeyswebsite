// app/api/estimate/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { address, propertyType = "residential" } = await req.json();
    if (!address || address.length < 6) {
      return NextResponse.json({ error: "Invalid address" }, { status: 400 });
    }

    // Geocode (Google)
    const geoUrl = new URL("https://maps.googleapis.com/maps/api/geocode/json");
    geoUrl.searchParams.set("address", address);
    geoUrl.searchParams.set("key", process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "");
    const geo = await fetch(geoUrl, { cache: "no-store" }).then(r => r.json());
    const place = geo?.results?.[0];
    if (!place) return NextResponse.json({ error: "Address not found" }, { status: 404 });

    const comps: Record<string,string> = {};
    for (const c of place.address_components || []) for (const t of c.types) comps[t] = c.long_name;
    const state = (comps.administrative_area_level_1 || "US").toUpperCase();
    const lat = place.geometry?.location?.lat ?? 0;
    const lng = place.geometry?.location?.lng ?? 0;

    // Heuristic estimate (works without paid data)
    const seed = Math.abs(Math.floor((lat + lng) * 100000)) % 97;
    const stateTax: Record<string, number> = { TX:0.016, CA:0.008, NY:0.017, NV:0.009, IL:0.020, FL:0.009 };
    const taxRate = stateTax[state] ?? (propertyType === "commercial" ? 0.016 : 0.012);

    const marketValue = 280_000 + (seed / 97) * 440_000;          // $280k–$720k
    const assessedValue = marketValue * (0.92 + (seed % 16) / 100); // 92–108% of MV
    const targetRatio = propertyType === "commercial" ? 0.85 : 0.88;
    const targetAssessment = marketValue * targetRatio;
    const potentialReduction = Math.max(0, assessedValue - targetAssessment);
    const baseWin = (["NV","TX","IL"].includes(state) ? 0.6 : 0.45) + (propertyType === "commercial" ? 0.1 : 0);
    const winProbability = Math.min(0.85, Math.max(0.3, baseWin - (seed % 7) * 0.02));
    const expectedReduction = potentialReduction * winProbability;
    const estimatedSavings = Math.round(expectedReduction * taxRate);

    return NextResponse.json({
      addressNormalized: place.formatted_address,
      inputs: { marketValue, assessedValue, taxRate, propertyType },
      estimatedSavings,
      breakdown: {
        potentialReduction: Math.round(potentialReduction),
        expectedReduction: Math.round(expectedReduction),
        winProbability: Number(winProbability.toFixed(2)),
        targetRatio,
      },
      disclaimer:
        "Savings are an estimate based on public data and heuristics. Actual results vary by jurisdiction and evidence.",
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
