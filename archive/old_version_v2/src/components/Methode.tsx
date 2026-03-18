"use client";

import Reveal from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Analyse",
    description:
      "Compréhension profonde de votre activité, vos objectifs, votre marché et votre audience cible.",
    detail: "Audit • Benchmark • Stratégie",
  },
  {
    number: "02",
    title: "Conception",
    description:
      "Design sur-mesure aligné sur votre identité. Wireframes, maquettes et validation avant développement.",
    detail: "UX/UI • Maquettes • Prototypage",
  },
  {
    number: "03",
    title: "Développement",
    description:
      "Code propre, performant et maintenable. Technologies modernes adaptées à vos besoins réels.",
    detail: "Code • SEO technique • Performance",
  },
  {
    number: "04",
    title: "Lancement",
    description:
      "Mise en ligne, tests finaux et accompagnement. Votre site est prêt à convertir dès le premier jour.",
    detail: "Tests • Déploiement • Suivi",
  },
];

export default function Methode() {
  return (
    <section id="methode" className="section-padding relative">
      {/* Separator */}
      <div className="line-gold mb-24 md:mb-32" />

      <div className="container-vix">
        {/* Section header */}
        <div className="text-center mb-20">
          <Reveal>
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-vix-gold font-semibold mb-4">
              Notre méthode
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-section font-bold text-vix-white mb-6">
              Précision.
              <br />
              <span className="text-vix-gray">À chaque étape.</span>
            </h2>
          </Reveal>
        </div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical gold line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-vix-gold/30 via-vix-gold/10 to-transparent" />

          <div className="flex flex-col gap-16">
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="relative flex gap-8 md:gap-12 group">
                  {/* Number circle */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-vix-gold/20 flex items-center justify-center bg-vix-black group-hover:border-vix-gold/40 transition-all duration-500">
                      <span className="text-vix-gold font-bold text-lg md:text-2xl tracking-tight">
                        {step.number}
                      </span>
                    </div>
                    {/* Glow on hover */}
                    <div className="absolute inset-0 rounded-full bg-vix-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  </div>

                  {/* Content */}
                  <div className="pt-2 md:pt-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-vix-white mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-vix-gray leading-relaxed mb-3 max-w-lg">
                      {step.description}
                    </p>
                    <span className="text-xs tracking-[0.15em] uppercase text-vix-gold/60 font-medium">
                      {step.detail}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
