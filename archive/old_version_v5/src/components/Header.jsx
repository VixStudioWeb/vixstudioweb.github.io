import { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import useScrollStore from '../store/useScrollStore';
import './Header.css';

gsap.registerPlugin(ScrollToPlugin);

const navItems = [
  { label: 'Accueil', href: '#hero', index: 0 },
  { label: 'Services', href: '#services', index: 1 },
  { label: 'Processus', href: '#process', index: 2 },
  { label: 'Réalisations', href: '#portfolio', index: 4 },
  { label: 'À propos', href: '#about', index: 5 },
];

export default function Header() {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const currentSection = useScrollStore((s) => s.currentSection);
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.7;

      // Show header after hero section
      if (scrollY > heroHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsMenuOpen(false);
      }

      lastScrollY.current = scrollY;
    };

    // On contact page, always show header
    if (location.pathname === '/contact') {
      setIsVisible(true);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Animate header entrance
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    if (isVisible) {
      gsap.to(header, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      });
    } else {
      gsap.to(header, {
        y: -80,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      });
    }
  }, [isVisible]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el) {
          gsap.to(window, {
            scrollTo: { y: el, offsetY: 0 },
            duration: 1.5,
            ease: 'power3.inOut',
          });
        }
      }, 600);
    } else {
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        gsap.to(window, {
          scrollTo: { y: el, offsetY: 0 },
          duration: 1.5,
          ease: 'power3.inOut',
        });
      }
    }
  };

  const handleContactClick = () => {
    setIsMenuOpen(false);
    navigate('/contact');
  };

  return (
    <header
      ref={headerRef}
      className={`site-header ${isVisible ? 'visible' : ''} ${isMenuOpen ? 'menu-open' : ''}`}
      style={{ transform: 'translateY(-80px)', opacity: 0 }}
      role="banner"
    >
      <div className="header-inner">
        <a
          href="#hero"
          className="header-logo"
          onClick={(e) => handleNavClick(e, '#hero')}
          data-cursor-hover
          aria-label="Vix Studio Web — Retour en haut"
        >
          <img src="/images/logo.png" alt="Vix Studio Web" />
        </a>

        <nav
          className={`header-nav ${isMenuOpen ? 'open' : ''}`}
          aria-label="Navigation principale"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`header-link ${currentSection === item.index ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item.href)}
              data-cursor-hover
              aria-current={currentSection === item.index ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
          <button
            className="header-cta btn-glow"
            onClick={handleContactClick}
            data-cursor-hover
          >
            Contact
          </button>
        </nav>

        <button
          className={`header-burger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isMenuOpen}
          data-cursor-hover
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
