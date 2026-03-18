"use client";

import Image from "next/image";
import Reveal from "./Reveal";

const projects = [
  {
    title: "La Course des Babets",
    category: "Site événementiel",
    description:
      "Site web complet pour un événement sportif majeur. Design immersif, inscriptions en ligne et expérience mobile optimisée.",
    image: "/images/portfolio/coursebabets/coursebabets_frontpage.png",
    detail: "/images/portfolio/coursebabets/coursebabets_closeup.png",
    tags: ["Design", "Responsive", "Performance"],
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-padding relative">
      {/* Separator */}
      <div className="line-gold mb-24 md:mb-32" />

      <div className="container-vix">
        {/* Section header */}
        <div className="text-center mb-20">
          <Reveal>
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-vix-gold font-semibold mb-4">
              Réalisations
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-section font-bold text-vix-white mb-6">
              Des projets qui
              <br />
              <span className="text-gradient-gold">parlent d&apos;eux-mêmes.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-subtitle text-vix-gray max-w-2xl mx-auto">
              Chaque projet est une collaboration étroite avec nos clients pour
              créer des expériences digitales mémorables.
            </p>
          </Reveal>
        </div>

        {/* Project showcase */}
        {projects.map((project, i) => (
          <Reveal key={i} delay={0.2}>
            <div className="group relative rounded-3xl border border-vix-gold/[0.08] bg-vix-anthracite/20 overflow-hidden hover:border-vix-gold/20 transition-all duration-700">
              {/* Gold corner accents */}
              <div className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-vix-gold/40 to-transparent z-10" />
              <div className="absolute top-0 left-0 h-20 w-px bg-gradient-to-b from-vix-gold/40 to-transparent z-10" />
              <div className="absolute bottom-0 right-0 w-20 h-px bg-gradient-to-l from-vix-gold/40 to-transparent z-10" />
              <div className="absolute bottom-0 right-0 h-20 w-px bg-gradient-to-t from-vix-gold/40 to-transparent z-10" />

              <div className="flex flex-col lg:flex-row">
                {/* Image section */}
                <div className="lg:w-3/5 relative">
                  <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-vix-black/80 hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-vix-black/60 to-transparent lg:hidden" />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-xs tracking-[0.2em] uppercase text-vix-gold font-semibold mb-4">
                    {project.category}
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-bold text-vix-white mb-4 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-vix-gray leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium text-vix-gold/70 border border-vix-gold/15 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Detail image */}
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-vix-gold/10">
                    <Image
                      src={project.detail}
                      alt={`${project.title} - détail`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 25vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
