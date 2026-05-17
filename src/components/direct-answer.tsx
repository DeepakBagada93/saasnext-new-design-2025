'use client';

import { motion } from "framer-motion";

export function DirectAnswer() {
  return (
    <section className="py-12 bg-primary/5 border-b border-primary/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 md:p-10 rounded-3xl bg-black border border-primary/20 shadow-[0_0_30px_rgba(41,171,226,0.1)]">
          <h2 className="text-xs font-mono text-primary uppercase tracking-widest mb-4">Direct Answer</h2>
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            <strong>SaaSNext</strong> is the premier <strong>AI agency in Junagadh</strong> specializing in custom AI agents, intelligent business automation, and high-performance web development. We help global brands rank in AI search engines (AEO) and streamline operations through LLM-powered solutions, ensuring maximum digital growth and efficiency.
          </p>
        </div>
      </div>
    </section>
  );
}
