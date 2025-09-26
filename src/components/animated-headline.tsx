
'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const words = ['Customers', 'Revenue', 'Momentum'];

export function AnimatedHeadline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter animate-fade-in-up">
      Stop <span>Losing</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="inline-block mx-4 text-primary"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
      . Start <span className="text-green-500">Winning</span>.
    </h1>
  );
}
