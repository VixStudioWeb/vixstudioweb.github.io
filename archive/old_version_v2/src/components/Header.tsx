"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { label: "Expertise", href: "#expertise" },
  { label: "Méthode", href: "#methode" },
  { label: "Réalisations", href: "#portfolio" },
  { label: "Pourquoi Vix", href: "#pourquoi" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-vix-black/80 backdrop-blur-xl border-b border-vix-gold/10"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="container-vix flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            aria-label="Vix Studio Web - Accueil"
          >
            <div className="relative w-10 h-10 overflow-hidden rounded-lg">
              <Image
                src="/images/logo.png"
                alt="Vix Studio Web"
                fill
                className="object-contain"
                priority
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
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-vix-gray hover:text-vix-gold transition-colors duration-300 tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Desktop */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-vix-black bg-vix-gold rounded-lg hover:bg-vix-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            Démarrer un projet
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <motion.span
              className="w-6 h-0.5 bg-vix-gold rounded-full origin-center"
              animate={
                mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-vix-gold rounded-full"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-vix-gold rounded-full origin-center"
              animate={
                mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-vix-black/98 backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-semibold text-vix-white hover:text-vix-gold transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-8 py-3 text-lg font-semibold text-vix-black bg-vix-gold rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                Démarrer un projet
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
