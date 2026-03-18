import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import AnimatedText from '../../components/AnimatedText';
import './about.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function About() {
  const sectionRef = useRef(null);
  const ctaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // About blocks entrance
      const blocks = section.querySelectorAll('.about-block');
      blocks.forEach((block, i) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 50, x: i % 2 === 0 ? -30 : 30 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1,
            delay: i * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // CTA button spring animation
      const cta = ctaRef.current;
      if (cta) {
        gsap.fromTo(
          cta,
          { opacity: 0, scale: 0.8, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: cta,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Cheetah mascot parallax
      const mascot = section.querySelector('.about-mascot');
      if (mascot) {
        gsap.to(mascot, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCTA = () => {
    navigate('/contact');
  };

  const handleFooterNav = (e, href) => {
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      gsap.to(window, {
        scrollTo: { y: el, offsetY: 0 },
        duration: 1.5,
        ease: 'power3.inOut',
      });
    }
  };

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="section-inner">
        <div className="about-header">
          <AnimatedText
            text="Qui est Vix ?"
            tag="h2"
            animation="reveal"
            className="about-main-title"
          />
        </div>

        <div className="about-content">
          <div className="about-blocks">
            <div className="about-block">
              <div className="about-block-accent" />
              <h3>Notre Vision</h3>
              <p>
                Nous croyons que chaque projet mérite une présence digitale
                qui reflète son unicité. Pas de templates, pas de compromis —
                seulement des créations sur-mesure qui marquent les esprits.
              </p>
            </div>

            <div className="about-block">
              <div className="about-block-accent" />
              <h3>Nos Valeurs</h3>
              <p>
                Excellence technique, sens du détail, immersion totale.
                Chaque pixel, chaque animation, chaque interaction est pensée
                pour créer une expérience fluide et mémorable.
              </p>
            </div>

            <div className="about-block">
              <div className="about-block-accent" />
              <h3>Notre Expertise</h3>
              <p>
                Design UI/UX avancé, développement front-end performant,
                animations immersives et optimisation de la performance.
                Nous maîtrisons l'art de donner vie aux idées.
              </p>
            </div>
          </div>

          <div className="about-visual">
            <div className="about-mascot">
              <img
                src="/images/cheetah_no_bg.png"
                alt="Vix - Mascotte guépard"
                loading="lazy"
              />
            </div>
            <div className="about-glow-circle" />
          </div>
        </div>

        <div className="about-cta" ref={ctaRef}>
          <AnimatedText
            text="Prêt à créer quelque chose d'exceptionnel ?"
            tag="p"
            animation="fade"
            className="cta-text"
          />
          <button
            className="btn-glow cta-button"
            onClick={handleCTA}
            data-cursor-hover
          >
            Démarrer un projet
            <span className="cta-arrow">→</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer" role="contentinfo" aria-label="Pied de page">
        <div className="footer-inner">
          <div className="footer-logo">
            <a href="#hero" onClick={(e) => handleFooterNav(e, '#hero')} data-cursor-hover aria-label="Retour en haut">
              <img src="/images/logo.png" alt="Vix Studio Web" />
            </a>
          </div>
          <nav className="footer-links" aria-label="Navigation de pied de page">
            <a href="#hero" onClick={(e) => handleFooterNav(e, '#hero')} data-cursor-hover>Accueil</a>
            <a href="#services" onClick={(e) => handleFooterNav(e, '#services')} data-cursor-hover>Services</a>
            <a href="#portfolio" onClick={(e) => handleFooterNav(e, '#portfolio')} data-cursor-hover>Réalisations</a>
            <a href="#about" onClick={(e) => handleFooterNav(e, '#about')} data-cursor-hover>À propos</a>
          </nav>
          <p className="footer-copy">
            © {new Date().getFullYear()} Vix Studio Web — Tous droits réservés
          </p>
        </div>
      </footer>
    </section>
  );
}
