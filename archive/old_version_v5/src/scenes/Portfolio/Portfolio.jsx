import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DiagonalTransition from '../../components/DiagonalTransition';
import portfolio from '../../data/portfolio';
import useThemeStore from '../../store/useThemeStore';
import './portfolio.css';

gsap.registerPlugin(ScrollTrigger);

function PortfolioProject({ project, index }) {
  const projectRef = useRef(null);
  const setTheme = useThemeStore((s) => s.setTheme);
  const resetTheme = useThemeStore((s) => s.resetTheme);

  useEffect(() => {
    const el = projectRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Title slides in fast then slows down
      const title = el.querySelector('.portfolio-project-title');
      gsap.fromTo(
        title,
        { x: index % 2 === 0 ? '60vw' : '-60vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // Description fades in
      const desc = el.querySelector('.portfolio-project-desc');
      gsap.fromTo(
        desc,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Images appear with stagger and slight parallax
      const images = el.querySelectorAll('.portfolio-image');
      images.forEach((img, i) => {
        gsap.fromTo(
          img,
          { opacity: 0, y: 60 + i * 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 55%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Slight parallax speed difference
        gsap.to(img, {
          y: (i - 1) * -40,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });

      // Theme change when project is in view
      ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setTheme(project.theme),
        onLeave: () => resetTheme(),
        onEnterBack: () => setTheme(project.theme),
        onLeaveBack: () => resetTheme(),
      });
    }, el);

    return () => ctx.revert();
  }, [project, index, setTheme, resetTheme]);

  return (
    <div ref={projectRef} className="portfolio-project" data-project={project.id}>
      <h3 className="portfolio-project-title">{project.title}</h3>

      <div className="portfolio-project-body">
        <p className="portfolio-project-desc">{project.description}</p>

        <div className="portfolio-images">
          {project.images.map((src, i) => (
            <div
              key={i}
              className={`portfolio-image portfolio-image-${i}`}
            >
              <img src={src} alt={`${project.title} - aperçu ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-link btn-glow"
            data-cursor-hover
          >
            Voir le site →
          </a>
        )}
      </div>
    </div>
  );
}

const patternSvgs = {
  forest: (color) => (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="forest-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M40 10 L50 30 L30 30 Z" fill="none" stroke={color} strokeWidth="0.5" opacity="0.15" />
          <path d="M40 20 L55 45 L25 45 Z" fill="none" stroke={color} strokeWidth="0.5" opacity="0.1" />
          <circle cx="20" cy="60" r="2" fill={color} opacity="0.08" />
          <circle cx="60" cy="70" r="1.5" fill={color} opacity="0.06" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#forest-pattern)" />
    </svg>
  ),
  geometric: (color) => (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="geo-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
          <rect x="5" y="5" width="20" height="20" fill="none" stroke={color} strokeWidth="0.5" opacity="0.1" transform="rotate(45 15 15)" />
          <circle cx="45" cy="45" r="8" fill="none" stroke={color} strokeWidth="0.5" opacity="0.08" />
          <line x1="0" y1="30" x2="60" y2="30" stroke={color} strokeWidth="0.3" opacity="0.05" />
          <line x1="30" y1="0" x2="30" y2="60" stroke={color} strokeWidth="0.3" opacity="0.05" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geo-pattern)" />
    </svg>
  ),
};

export default function Portfolio() {
  const sectionRef = useRef(null);
  const currentTheme = useThemeStore((s) => s.currentTheme);

  const PatternBg = patternSvgs[currentTheme.pattern];

  return (
    <div ref={sectionRef} id="portfolio">
      <DiagonalTransition direction="left" nextTitle="Nos Réalisations">
        <div
          className="portfolio-wrapper"
          style={{
            '--theme-primary': currentTheme.primary,
            '--theme-secondary': currentTheme.secondary,
            '--theme-bg': currentTheme.background,
            '--theme-text': currentTheme.text,
            '--theme-accent': currentTheme.accent,
            backgroundColor: currentTheme.background,
          }}
        >
          {PatternBg && (
            <div className={`portfolio-pattern-bg ${currentTheme.pattern !== 'default' ? 'active' : ''}`}>
              {PatternBg(currentTheme.accent)}
            </div>
          )}
          {portfolio.map((project, i) => (
            <PortfolioProject key={project.id} project={project} index={i} />
          ))}
        </div>
      </DiagonalTransition>
    </div>
  );
}
