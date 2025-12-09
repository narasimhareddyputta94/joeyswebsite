"use client";

export default function TrustBar() {
  return (
    <div
      className="sticky top-14 z-40 w-full border-b bg-indigo-600/95 text-white backdrop-blur supports-[backdrop-filter]:bg-indigo-600/75"
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium tracking-wide">
        
        {/* Part 1 */}
        <span>Human Insight</span>
        
        {/* Separator Dot */}
        <span className="opacity-50">•</span>
        
        {/* Part 2 */}
        <span>AI Precision</span>
        
        {/* Separator Dot */}
        <span className="opacity-50">•</span>
        
        {/* Part 3 */}
        <span className="text-indigo-100">Real Impact</span>

      </div>
    </div>
  );
}