/**
 * LottieCarousel
 * Auto-rotates through 3 Lottie animations every 4 seconds.
 * Designed to sit full-width in a hero context (max-w-3xl container).
 * Smooth fade crossfade via Framer Motion AnimatePresence.
 * No arrows, no dots — pure automatic infinite loop.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LOTTIE_SRCS = [
  'https://lottie.host/8ee12f48-0c20-46db-820a-0a2881f0a36e/9HInnDC3y2.lottie',
  'https://lottie.host/bdd9b490-3f0a-4506-8c6a-f48a6a372b07/nW1RKyYOKC.lottie',
  'https://lottie.host/8f021569-9713-4bbf-9942-7c539ac3f986/9WDfCvWG4x.lottie',
];

const LABELS = [
  'Cybersecurity & Cloud',
  'DevOps Engineering',
  'Data Science & AI',
];

const INTERVAL_MS = 4000;

export function LottieCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % LOTTIE_SRCS.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #eef2ff 60%, #f0f9ff 100%)',
        boxShadow: '0 24px 64px rgba(37,99,235,0.12), 0 4px 16px rgba(37,99,235,0.07)',
      }}
    >
      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #2563eb 1px, transparent 1px)`,
          backgroundSize: '22px 22px',
        }}
      />

      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-300/40 rounded-tl-2xl pointer-events-none z-20" />
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-indigo-300/40 rounded-br-2xl pointer-events-none z-20" />

      {/* Label pill */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`label-${activeIndex}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-blue-100 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-bold text-blue-700 whitespace-nowrap">{LABELS[activeIndex]}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lottie crossfade */}
      <div className="relative z-10 flex items-center justify-center px-8 pt-16 pb-10" style={{ minHeight: '440px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full flex items-center justify-center"
          >
            <DotLottieReact
              src={LOTTIE_SRCS[activeIndex]}
              autoplay
              loop
              style={{ width: '100%', maxWidth: '520px', height: '380px' }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-100/60 rounded-b-2xl overflow-hidden">
        <motion.div
          key={`bar-${activeIndex}`}
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
        />
      </div>
    </div>
  );
}