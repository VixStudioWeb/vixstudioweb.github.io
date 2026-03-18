"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMemo, useState } from "react";

const sectors = [
  "Coffee Shop",
  "Concept Store",
  "Studio Beauté",
  "Traiteur",
  "Salle de sport",
] as const;

const goals = [
  "Plus de réservations",
  "Plus de ventes",
  "Image de marque premium",
  "Automatiser les demandes",
] as const;

const portfolioStats = [
  { label: "Temps moyen sur site", value: "+142%" },
  { label: "Demandes qualifiées", value: "+88%" },
  { label: "Vitesse mobile", value: "97/100" },
];

export default function VixExperience() {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 18 });

  const [selectedSector, setSelectedSector] = useState<(typeof sectors)[number]>(
    sectors[0]
  );
  const [selectedGoal, setSelectedGoal] = useState<(typeof goals)[number]>(goals[0]);
  const [budget, setBudget] = useState(4500);
  const [urgency, setUrgency] = useState(4);
  const [reveal, setReveal] = useState(54);

  const simulation = useMemo(() => {
    const urgencyBoost = urgency * 4;
    const basePotential = Math.round((budget / 1000) * 22 + urgencyBoost);
    const estimatedLeads = Math.max(25, Math.round(basePotential * 0.95));
    const conversion = Math.min(14, Math.round(3 + budget / 1500 + urgency / 2));

    const plan =
      budget < 3500
        ? "Sprint Impact"
        : budget < 7000
          ? "Signature Commerce"
          : "Expérience Totale";

    return {
      plan,
      estimatedLeads,
      conversion,
      launch: Math.max(8, 24 - urgency * 2),
      wow: Math.min(100, 58 + Math.round(basePotential / 2)),
    };
  }, [budget, urgency]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-vix-black text-vix-white">
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-80"
        style={{
          background:
            "radial-gradient(460px circle at var(--x) var(--y), rgba(232,200,74,0.16), transparent 70%)",
          ["--x" as string]: smoothX,
          ["--y" as string]: smoothY,
        }}
      />

      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.06] [background-size:44px_44px] [background-image:linear-gradient(to_right,rgba(232,200,74,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(232,200,74,0.35)_1px,transparent_1px)]" />

      <header className="sticky top-0 z-30 border-b border-vix-gold/10 bg-vix-black/80 backdrop-blur-xl">
        <div className="container-vix flex h-20 items-center justify-between">
          <a href="#top" className="flex items-center gap-3" aria-label="Vix accueil">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-vix-gold/30 bg-vix-white">
              <Image src="/images/logo.png" alt="Vix" fill className="object-contain" priority />
            </div>
            <div>
              <p className="text-lg font-black tracking-[0.24em] text-vix-gold">VIX</p>
              <p className="-mt-1 text-[10px] uppercase tracking-[0.34em] text-vix-gray">
                Commerce Digital Atelier
              </p>
            </div>
          </a>

          <nav className="hidden gap-8 text-sm font-semibold text-vix-gray md:flex">
            <a href="#experience" className="transition hover:text-vix-gold">
              Expérience
            </a>
            <a href="#simulator" className="transition hover:text-vix-gold">
              Simulateur
            </a>
            <a href="#portfolio" className="transition hover:text-vix-gold">
              Résultats
            </a>
            <a href="#contact" className="transition hover:text-vix-gold">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main
        id="top"
        className="relative z-10"
        onMouseMove={(event) => {
          const x = (event.clientX / window.innerWidth) * 100;
          const y = (event.clientY / window.innerHeight) * 100;
          mouseX.set(x);
          mouseY.set(y);
        }}
      >
        <section id="experience" className="container-vix grid items-center gap-14 pb-20 pt-24 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="mb-7 inline-flex rounded-full border border-vix-gold/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-vix-gold">
              Studio web design pour commerçants indépendants
            </span>
            <h1 className="max-w-3xl text-hero font-black leading-[0.95] text-vix-white">
              Votre boutique mérite un site
              <span className="block text-vix-gold">qui provoque un effet wow immédiat.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-vix-gray">
              Vix imagine des vitrines digitales cinématographiques, rapides et stratégiques.
              Votre client n&apos;arrive plus sur une page, il entre dans une expérience.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#simulator"
                className="rounded-xl bg-vix-gold px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-vix-black transition hover:bg-vix-gold-light hover:shadow-[0_0_30px_rgba(232,200,74,0.4)]"
              >
                Tester mon potentiel
              </a>
              <a
                href="#portfolio"
                className="rounded-xl border border-vix-gold/30 px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-vix-white transition hover:border-vix-gold hover:text-vix-gold"
              >
                Voir un cas réel
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[2rem] border border-vix-gold/30" />
            <div className="relative overflow-hidden rounded-[2rem] border border-vix-gold/20 bg-vix-anthracite/70 p-6 backdrop-blur-lg">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-vix-gold/20 bg-vix-black">
                <Image
                  src="/images/logo_bg_white.png"
                  alt="Texture Vix"
                  fill
                  className="object-cover opacity-35"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vix-black via-vix-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-vix-gold">Direction artistique</p>
                  <p className="mt-2 text-2xl font-bold">Blanc. Jaune. Noir.</p>
                  <p className="mt-2 text-sm text-vix-gray">Minimaliste, puissant, mémorable.</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                {portfolioStats.map((item) => (
                  <div key={item.label} className="rounded-xl border border-vix-gold/20 bg-vix-black/80 px-3 py-4">
                    <p className="text-lg font-black text-vix-gold">{item.value}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-vix-gray">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="simulator" className="container-vix pb-28 pt-8">
          <div className="rounded-[2rem] border border-vix-gold/25 bg-vix-anthracite/50 p-7 md:p-10">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-vix-gold">Interaction en direct</p>
                <h2 className="mt-3 text-section font-black">Simulateur de transformation digitale</h2>
              </div>
              <p className="max-w-lg text-sm leading-relaxed text-vix-gray">
                Modifiez les paramètres et observez la projection Vix en temps réel. L&apos;objectif : rendre votre site aussi performant que spectaculaire.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
              <div className="space-y-7">
                <div>
                  <p className="mb-3 text-sm font-semibold text-vix-white">Votre secteur</p>
                  <div className="flex flex-wrap gap-2">
                    {sectors.map((sector) => (
                      <button
                        key={sector}
                        onClick={() => setSelectedSector(sector)}
                        className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                          selectedSector === sector
                            ? "border-vix-gold bg-vix-gold text-vix-black"
                            : "border-vix-gold/30 text-vix-gray hover:border-vix-gold hover:text-vix-gold"
                        }`}
                      >
                        {sector}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-semibold text-vix-white">Priorité business</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {goals.map((goal) => (
                      <button
                        key={goal}
                        onClick={() => setSelectedGoal(goal)}
                        className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                          selectedGoal === goal
                            ? "border-vix-gold bg-vix-gold/15 text-vix-white"
                            : "border-vix-gold/20 text-vix-gray hover:border-vix-gold/40 hover:text-vix-white"
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between text-sm font-semibold">
                    <span>Budget projet</span>
                    <span className="text-vix-gold">{budget.toLocaleString("fr-FR")} €</span>
                  </div>
                  <input
                    type="range"
                    min={2000}
                    max={12000}
                    step={500}
                    value={budget}
                    onChange={(event) => setBudget(Number(event.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-vix-gray-dark accent-vix-gold"
                  />
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between text-sm font-semibold">
                    <span>Niveau d&apos;urgence</span>
                    <span className="text-vix-gold">{urgency}/5</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={urgency}
                    onChange={(event) => setUrgency(Number(event.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-vix-gray-dark accent-vix-gold"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-vix-gold/25 bg-vix-black/80 p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-vix-gold">Projection Vix</p>
                <h3 className="mt-2 text-2xl font-black">Plan {simulation.plan}</h3>
                <p className="mt-2 text-sm text-vix-gray">
                  Pour {selectedSector.toLowerCase()} axé “{selectedGoal.toLowerCase()}”.
                </p>

                <div className="mt-7 grid grid-cols-2 gap-4">
                  <DataCard label="Leads/mois estimés" value={`${simulation.estimatedLeads}`} />
                  <DataCard label="Taux conversion cible" value={`${simulation.conversion}%`} />
                  <DataCard label="Lancement" value={`${simulation.launch} jours`} />
                  <DataCard label="Score wow" value={`${simulation.wow}/100`} />
                </div>

                <a
                  href="#contact"
                  className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-vix-gold px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-vix-black transition hover:bg-vix-gold-light"
                >
                  Recevoir ce plan
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="container-vix pb-28">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-vix-gold">Démo visuelle</p>
              <h2 className="mt-3 text-section font-black">Avant / Après : immersion instantanée</h2>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-vix-gold/25 bg-vix-black">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/images/portfolio/coursebabets/coursebabets_frontpage.png"
                alt="Version classique"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}>
                <Image
                  src="/images/portfolio/coursebabets/coursebabets_closeup.png"
                  alt="Version Vix"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute inset-y-0" style={{ left: `${reveal}%` }}>
                <div className="h-full w-[2px] bg-vix-gold" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-vix-gold bg-vix-black px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-vix-gold">
                  glide
                </div>
              </div>

              <div className="absolute left-4 top-4 rounded-full border border-vix-gold/40 bg-vix-black/70 px-3 py-1 text-xs uppercase tracking-[0.14em] text-vix-white">
                Avant
              </div>
              <div className="absolute right-4 top-4 rounded-full border border-vix-gold/40 bg-vix-black/70 px-3 py-1 text-xs uppercase tracking-[0.14em] text-vix-gold">
                Après Vix
              </div>
            </div>

            <div className="border-t border-vix-gold/20 bg-vix-anthracite/70 p-5">
              <input
                aria-label="Comparer avant et après"
                type="range"
                min={15}
                max={85}
                value={reveal}
                onChange={(event) => setReveal(Number(event.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-vix-gray-dark accent-vix-gold"
              />
            </div>
          </div>
        </section>

        <section id="contact" className="container-vix pb-32">
          <div className="grid gap-8 rounded-[2rem] border border-vix-gold/25 bg-gradient-to-br from-vix-anthracite to-vix-black p-8 md:p-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vix-gold">Prêt à marquer les esprits ?</p>
              <h2 className="mt-4 text-section font-black">Créons une vitrine que vos concurrents vont envier.</h2>
              <p className="mt-5 max-w-xl text-vix-gray">
                Un message suffit pour démarrer une direction artistique, un prototype interactif et une feuille de route orientée ventes.
              </p>
            </div>
            <div className="rounded-2xl border border-vix-gold/20 bg-vix-black/70 p-6">
              <p className="text-sm text-vix-gray">Réponse moyenne</p>
              <p className="text-4xl font-black text-vix-gold">&lt; 24h</p>
              <a
                href="mailto:hello@vix.studio"
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-vix-gold px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-vix-black transition hover:bg-vix-gold-light"
              >
                hello@vix.studio
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function DataCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-vix-gold/20 bg-vix-anthracite/60 p-4">
      <p className="text-xs uppercase tracking-[0.12em] text-vix-gray">{label}</p>
      <p className="mt-2 text-2xl font-black text-vix-gold">{value}</p>
    </div>
  );
}
