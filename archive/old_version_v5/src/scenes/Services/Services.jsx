import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '../../components/AnimatedText';
import GlowCard from '../../components/GlowCard';
import services from '../../data/services';
import './services.css';

gsap.registerPlugin(ScrollTrigger);

const serviceIcons = {
  layout: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="6" y="6" width="36" height="36" rx="4" />
      <line x1="6" y1="18" x2="42" y2="18" />
      <line x1="20" y1="18" x2="20" y2="42" />
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="24" cy="24" r="18" />
      <circle cx="18" cy="16" r="3" fill="currentColor" />
      <circle cx="30" cy="16" r="3" fill="currentColor" />
      <circle cx="14" cy="26" r="3" fill="currentColor" />
      <circle cx="28" cy="28" r="3" fill="currentColor" />
    </svg>
  ),
  magic: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M24 4 L28 16 L40 16 L30 24 L34 36 L24 28 L14 36 L18 24 L8 16 L20 16 Z" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16,12 6,24 16,36" />
      <polyline points="32,12 42,24 32,36" />
      <line x1="28" y1="8" x2="20" y2="40" />
    </svg>
  ),
  refresh: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M38 24A14 14 0 1 1 24 10" />
      <polyline points="38,10 38,24 24,24" />
    </svg>
  ),
};

export default function Services() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = cardsContainerRef.current;
    if (!section || !container) return;

    const cards = container.querySelectorAll('.service-card');

    const ctx = gsap.context(() => {
      // Pin the section briefly when all cards are centered
      ScrollTrigger.create({
        trigger: section,
        start: 'top 20%',
        end: '+=300',
        pin: true,
        pinSpacing: true,
      });

      // Staggered card entrance
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Icon animations on appearance
      const icons = container.querySelectorAll('.service-icon svg');
      gsap.fromTo(
        icons,
        { scale: 0, rotation: -20 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.12,
          delay: 0.3,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    // Card glow follow mouse
    const handleCardMouseMove = (e) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    };

    container.addEventListener('mousemove', handleCardMouseMove);

    return () => {
      ctx.revert();
      container.removeEventListener('mousemove', handleCardMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="services-section" id="services">
      <div className="section-inner">
        <AnimatedText
          text="Nos Expertises"
          tag="h2"
          animation="reveal"
          className="services-title"
        />
        <AnimatedText
          text="Des solutions digitales sur-mesure pour donner vie à vos ambitions"
          tag="p"
          animation="fade"
          delay={0.3}
          className="services-subtitle"
        />

        <div ref={cardsContainerRef} className="services-grid">
          {services.map((service) => (
            <GlowCard key={service.id} className="service-card">
              <div className="service-icon">
                {serviceIcons[service.icon]}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
