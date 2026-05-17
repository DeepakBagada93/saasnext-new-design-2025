'use client';

import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const comparisonData = [
  { feature: "AI Engine Optimization (AEO)", saasnext: true, traditional: false },
  { feature: "Generative Engine Opt. (GEO)", saasnext: true, traditional: false },
  { feature: "Custom AI Agent Development", saasnext: true, traditional: false },
  { feature: "Next.js 15+ Performance", saasnext: true, traditional: "Partial" },
  { feature: "Traditional SEO", saasnext: true, traditional: true },
  { feature: "Mobile-First Design", saasnext: true, traditional: true },
  { feature: "Automated Lead Funnels", saasnext: true, traditional: "Optional" },
];

export function AEOComparison() {
  return (
    <section className="py-20 bg-neutral-950 border-y border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-4">SaaSNext vs. Traditional Agencies</h2>
          <p className="text-neutral-400">Why choosing an AI-native agency matters for your future growth.</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="p-4 md:p-6 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Capabilities</th>
                <th className="p-4 md:p-6 text-sm font-semibold text-primary uppercase tracking-wider text-center">SaaSNext</th>
                <th className="p-4 md:p-6 text-sm font-semibold text-neutral-400 uppercase tracking-wider text-center">Traditional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {comparisonData.map((item, index) => (
                <tr key={index} className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-4 md:p-6 text-neutral-300 font-medium">{item.feature}</td>
                  <td className="p-4 md:p-6 text-center">
                    {item.saasnext ? (
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-neutral-600" />
                    )}
                  </td>
                  <td className="p-4 md:p-6 text-center">
                    {item.traditional === true ? (
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    ) : item.traditional === "Partial" || item.traditional === "Optional" ? (
                      <span className="text-xs font-mono text-neutral-500">{item.traditional}</span>
                    ) : (
                      <X className="mx-auto h-5 w-5 text-red-500/50" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 text-center">
            <p className="text-sm text-neutral-500 italic">
                * Based on industry standards for AI integration and technical SEO as of 2025.
            </p>
        </div>
      </div>
    </section>
  );
}
