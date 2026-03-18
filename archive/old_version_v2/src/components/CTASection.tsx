"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function CTASection() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Separator */}
      <div className="line-gold mb-24 md:mb-32" />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="container-vix relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-vix-gold font-semibold mb-6">
              Prêt à passer au niveau supérieur ?
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-section font-bold text-vix-white mb-8">
              Votre projet mérite
              <br />
              <span className="text-gradient-gold">une exécution parfaite.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-subtitle text-vix-gray mb-12 max-w-xl mx-auto">
              Discutons de vos ambitions. Premier échange gratuit et sans
              engagement, pour comprendre vos enjeux et vous proposer la
              meilleure approche.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="mailto:contact@vixstudioweb.com"
                className="group relative inline-flex items-center gap-3 px-10 py-5 text-base font-bold text-vix-black bg-vix-gold rounded-xl hover:bg-vix-gold-light transition-all duration-300"
                whileHover={{
                  boxShadow: "0 0 50px rgba(212,175,55,0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Planifier un appel découverte
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              </motion.a>
            </div>
          </Reveal>

          {/* Trust indicators */}
          <Reveal delay={0.5}>
            <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-12 border-t border-vix-gold/[0.08]">
              {[
                "Réponse sous 24h",
                "Devis gratuit",
                "Sans engagement",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-vix-gold/60" />
                  <span className="text-sm text-vix-gray">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
