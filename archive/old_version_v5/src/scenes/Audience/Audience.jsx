import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '../../components/AnimatedText';
import GlowCard from '../../components/GlowCard';
import audience from '../../data/audience';
import './audience.css';

gsap.registerPlugin(ScrollTrigger);

export default function Audience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.audience-card');

    const ctx = gsap.context(() => {
      // Asymmetric entrance — each card comes from different direction
      cards.forEach((card, i) => {
        const xFrom = i === 0 ? -100 : i === 1 ? 0 : 100;
        const yFrom = i === 1 ? 100 : 60;
        const delay = i * 0.15;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: xFrom,
            y: yFrom,
            rotation: (i - 1) * 3,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            duration: 1,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 65%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Subtle parallax on cards
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: (i - 1) * -30,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, section);

    // Card hover glow tracking
    const handleMouseMove = (e) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    };

    section.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="audience-section" id="audience">
      <div className="section-inner">
        <AnimatedText
          text="Pour Qui ?"
          tag="h2"
          animation="reveal"
          className="audience-title"
        />
        <AnimatedText
          text="Nous accompagnons ceux qui veulent marquer les esprits en ligne"
          tag="p"
          animation="fade"
          delay={0.2}
          className="audience-subtitle"
        />

        <div className="audience-grid">
          {audience.map((item) => (
            <GlowCard key={item.id} className="audience-card">
              <div className="audience-icon">{item.icon}</div>
              <h3 className="audience-card-title">{item.title}</h3>
              <p className="audience-card-desc">{item.description}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
