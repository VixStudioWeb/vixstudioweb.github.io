"use client";

import { motion } from "framer-motion";
import PantherMascot from "./PantherMascot";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-dark-gradient" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, transparent 60%)",
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container-vix relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pt-24">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase text-vix-gold border border-vix-gold/20 rounded-full mb-8">
              Agence Web Premium
            </span>
          </motion.div>

          <motion.h1
            className="text-hero font-bold text-vix-white mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Nous créons des sites
            <br />
            <span className="text-gradient-gold">redoutablement</span>
            <br />
            efficaces.
          </motion.h1>

          <motion.p
            className="text-subtitle text-vix-gray max-w-xl mx-auto lg:mx-0 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Sites sur-mesure pour commerces et PME ambitieuses.
            <br className="hidden sm:block" />
            Performance, élégance et résultats mesurables.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 px-8 py-4 text-sm font-bold text-vix-black bg-vix-gold rounded-xl hover:bg-vix-gold-light transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.35)]"
            >
              Discutons de votre projet
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-6 py-4 text-sm font-medium text-vix-gray hover:text-vix-gold transition-colors duration-300"
            >
              Voir nos réalisations
            </a>
          </motion.div>
        </div>

        {/* Mascot */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <PantherMascot size={320} animated />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-vix-gray/50">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-vix-gold/50 to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
