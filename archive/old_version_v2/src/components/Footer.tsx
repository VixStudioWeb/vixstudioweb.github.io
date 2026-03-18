"use client";

import Image from "next/image";
import PantherMascot from "./PantherMascot";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-vix-gold/[0.08]">
      <div className="container-vix py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                <Image
                  src="/images/logo.png"
                  alt="Vix Studio Web"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-wide text-gradient-gold">
                  VIX
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-vix-gray font-medium -mt-1">
                  Studio Web
                </span>
              </div>
            </div>
            <p className="text-sm text-vix-gray leading-relaxed">
              Agence web premium spécialisée dans la création de sites
              sur-mesure pour commerces et PME ambitieuses.
            </p>
            {/* Small mascot */}
            <div className="opacity-40 hover:opacity-60 transition-opacity duration-500">
              <PantherMascot size={60} animated={false} />
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-vix-gold font-semibold mb-5">
                Navigation
              </h4>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Expertise", href: "#expertise" },
                  { label: "Méthode", href: "#methode" },
                  { label: "Réalisations", href: "#portfolio" },
                  { label: "Pourquoi Vix", href: "#pourquoi" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-vix-gray hover:text-vix-gold transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-vix-gold font-semibold mb-5">
                Contact
              </h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="mailto:contact@vixstudioweb.com"
                    className="text-sm text-vix-gray hover:text-vix-gold transition-colors duration-300"
                  >
                    contact@vixstudioweb.com
                  </a>
                </li>
                <li>
                  <span className="text-sm text-vix-gray">
                    La Réunion, France
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-vix-gold/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-vix-gray/60">
            © {currentYear} Vix Studio Web. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-vix-gray/60 hover:text-vix-gold transition-colors duration-300"
            >
              Mentions légales
            </a>
            <a
              href="#"
              className="text-xs text-vix-gray/60 hover:text-vix-gold transition-colors duration-300"
            >
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
