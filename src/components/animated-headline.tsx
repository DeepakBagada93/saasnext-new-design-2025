
'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type AnimatedHeadlineProps = {
  words: string[];
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
};

export function AnimatedHeadline({ words, prefix, suffix, className }: AnimatedHeadlineProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <h1 className={className}>
      {prefix && <span>{prefix}</span>}
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="inline-block mx-2 text-primary"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
      {suffix && <span>{suffix}</span>}
    </h1>
  );
}
