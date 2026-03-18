"use client";

import Reveal from "./Reveal";

const expertises = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: "Création sur mesure",
    description:
      "Chaque site est conçu de zéro, sans template. Design unique adapté à votre identité et à vos objectifs commerciaux.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Performance maximale",
    description:
      "Sites rapides, légers et optimisés. Temps de chargement minimal pour une expérience utilisateur irréprochable.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: "SEO & Visibilité",
    description:
      "Architecture technique pensée pour le référencement naturel. Soyez trouvé par vos clients, pas seulement vu.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: "Accompagnement stratégique",
    description:
      "Au-delà du développement : conseil, stratégie digitale et suivi. Votre croissance en ligne est notre obsession.",
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="section-padding relative">
      {/* Separator */}
      <div className="line-gold mb-24 md:mb-32" />

      <div className="container-vix">
        {/* Section header */}
        <div className="text-center mb-20">
          <Reveal>
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-vix-gold font-semibold mb-4">
              Notre expertise
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-section font-bold text-vix-white mb-6">
              Chaque détail compte.
              <br />
              <span className="text-vix-gray">Chaque pixel a un rôle.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-subtitle text-vix-gray max-w-2xl mx-auto">
              Nous combinons design de haut niveau et excellence technique pour
              des sites qui convertissent, pas juste qui impressionnent.
            </p>
          </Reveal>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {expertises.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="group relative p-8 lg:p-10 rounded-2xl border border-vix-gold/[0.08] bg-vix-anthracite/30 hover:bg-vix-anthracite/50 hover:border-vix-gold/20 transition-all duration-500">
                {/* Gold corner accent */}
                <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-vix-gold/40 to-transparent" />
                <div className="absolute top-0 left-0 h-12 w-px bg-gradient-to-b from-vix-gold/40 to-transparent" />

                <div className="text-vix-gold mb-6 group-hover:text-vix-gold-light transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-vix-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-vix-gray leading-relaxed text-[15px]">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
