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

    // Heuristic: infer commercial vs residential from place types + user input
    const commercialTypes = new Set([
      "establishment",
      "point_of_interest",
      "premise",
      "school",
      "university",
      "hospital",
      "lodging",
      "restaurant",
      "cafe",
      "bar",
      "store",
      "shopping_mall",
      "stadium",
      "airport",
      "bank",
      "courthouse",
      "church",
    ]);
    const detectedCommercial = (place.types || []).some((t: string) => commercialTypes.has(t));
    const isCommercial = propertyType === "commercial" || detectedCommercial;

    // Heuristic estimate (works without paid data). We scale by:
    // - geo seed for variability, state tax rates, property type, and viewport size as a proxy for footprint.
    const seed = Math.abs(Math.floor((lat + lng) * 100000)) % 101; // 0–100
    const rand = seed / 100; // 0–1
    const stateTax: Record<string, number> = { TX:0.016, CA:0.008, NY:0.017, NV:0.009, IL:0.020, FL:0.009 };
    const baseTaxRate = stateTax[state] ?? (isCommercial ? 0.016 : 0.012);

    const viewport = place.geometry?.viewport;
    const latSpan = Math.abs((viewport?.northeast?.lat ?? 0) - (viewport?.southwest?.lat ?? 0));
    const lngSpan = Math.abs((viewport?.northeast?.lng ?? 0) - (viewport?.southwest?.lng ?? 0));
    const footprint = latSpan * lngSpan; // crude proxy; higher for large parcels
    const footprintBoost = isCommercial
      ? Math.min(1.8, 1 + footprint * 10_000)
      : Math.min(1.4, 1 + footprint * 6_000);

    const baseValue = isCommercial ? 1_000_000 : 260_000;
    const spread = isCommercial ? 5_000_000 : 900_000;
    const marketValue = (baseValue + spread * rand) * footprintBoost;

    const assessedBump = isCommercial ? 0.9 + (rand * 0.25) : 0.88 + (rand * 0.18); // 90–115% / 88–106%
    const assessedValue = marketValue * assessedBump;

    const targetRatio = isCommercial ? 0.82 : 0.88;
    const targetAssessment = marketValue * targetRatio;
    const potentialReduction = Math.max(0, assessedValue - targetAssessment);

    const baseWin = (["NV","TX","IL"].includes(state) ? 0.6 : 0.45) + (isCommercial ? 0.08 : 0);
    const winProbability = Math.min(0.9, Math.max(0.3, baseWin - (seed % 9) * 0.02));
    const expectedReduction = potentialReduction * winProbability;
    const estimatedSavings = Math.round(expectedReduction * baseTaxRate);

    return NextResponse.json({
      addressNormalized: place.formatted_address,
      inputs: { marketValue, assessedValue, taxRate: baseTaxRate, propertyType: isCommercial ? "commercial" : "residential" },
      estimatedSavings,
      breakdown: {
        potentialReduction: Math.round(potentialReduction),
        expectedReduction: Math.round(expectedReduction),
        winProbability: Number(winProbability.toFixed(2)),
        targetRatio,
        footprintBoost: Number(footprintBoost.toFixed(2)),
      },
      disclaimer:
        "Savings are an estimate based on public data and heuristics. Actual results vary by jurisdiction and evidence.",
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
