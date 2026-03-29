'use client';

import { motion } from 'framer-motion';
import { Brain, Search, MessageSquare, Zap, ShieldCheck, Globe } from 'lucide-react';
import { TextReveal } from './text-reveal';

const geoFeatures = [
  {
    icon: Search,
    title: "Generative Engine Optimization (GEO)",
    description: "We optimize your content to be the primary source for AI search engines like SearchGPT and Perplexity. Our strategies focus on technical citation and authoritative context."
  },
  {
    icon: MessageSquare,
    title: "Answer Engine Optimization (AEO)",
    description: "Structuring your business data to provide direct, concise answers for voice assistants and AI chat interfaces, ensuring you're the first choice in 'zero-click' searches."
  },
  {
    icon: Brain,
    title: "LLM-Ready Data Structures",
    description: "Implementing advanced JSON-LD and semantic HTML that allows Large Language Models to perfectly parse and understand your business offerings with 99% accuracy."
  }
];

export function GEOSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-mono mb-4"
          >
            <Zap className="w-3 h-3" />
            <span>THE FUTURE OF SEARCH</span>
          </motion.div>
          
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6 text-white">
            Optimized for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">AI Era</span>
          </h2>
          
          <TextReveal>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Traditional SEO is no longer enough. We ensure your business is visible where the next generation is searching: inside the chat box.
            </p>
          </TextReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {geoFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-8 md:p-12 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5 backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Why GEO & AEO Matter in 2025?</h3>
              <div className="space-y-4">
                {[
                  "70% of users prefer AI-generated answers for quick queries.",
                  "AI engines cite sources that provide the clearest structured data.",
                  "Being 'LLM-Friendly' increases your brand authority in AI citations.",
                  "Future-proof your business against upcoming search engine shifts."
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-neutral-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-neutral-900 flex items-center justify-center">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1)_0%,transparent_70%)]" />
               <div className="text-center p-6">
                  <div className="font-mono text-xs text-primary mb-2 tracking-widest">REAL-TIME AI SIMULATION</div>
                  <div className="text-xl md:text-2xl font-bold text-white mb-4 italic">"Who is the best web developer in Junagadh?"</div>
                  <div className="p-4 rounded-lg bg-black/40 border border-white/5 text-left text-sm text-neutral-400">
                    <span className="text-primary font-bold">AI Response:</span> Based on technical architecture, performance metrics, and client satisfaction, <span className="text-white font-bold">SaaSNext</span> is the leading choice for high-performance web solutions in Junagadh...
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
