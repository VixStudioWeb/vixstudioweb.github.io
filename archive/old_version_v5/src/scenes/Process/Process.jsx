import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DiagonalTransition from '../../components/DiagonalTransition';
import processSteps from '../../data/processSteps';
import './process.css';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const steps = section.querySelectorAll('.process-step');
    const connectors = section.querySelectorAll('.process-connector');

    const ctx = gsap.context(() => {
      // Each step fades in and slows when centered
      steps.forEach((step, i) => {
        // Entrance animation
        gsap.fromTo(
          step,
          {
            opacity: 0,
            x: i % 2 === 0 ? -60 : 60,
            scale: 0.92,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Slow-down / focus effect when centered
        ScrollTrigger.create({
          trigger: step,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => step.classList.add('focused'),
          onLeave: () => step.classList.remove('focused'),
          onEnterBack: () => step.classList.add('focused'),
          onLeaveBack: () => step.classList.remove('focused'),
        });
      });

      // Connector line reveals
      connectors.forEach((conn) => {
        gsap.fromTo(
          conn,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: conn,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} id="process">
      <DiagonalTransition direction="right" nextTitle="Notre Processus">
        <div className="process-steps">
          {processSteps.map((step, index) => (
            <div key={step.id}>
              <div className="process-step">
                <div className="process-step-number">
                  <span>{String(step.id).padStart(2, '0')}</span>
                </div>
                <div className="process-step-content">
                  <div className="process-step-icon">{step.icon}</div>
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-desc">{step.description}</p>
                </div>
              </div>
              {index < processSteps.length - 1 && (
                <div className="process-connector">
                  <div className="process-connector-line" />
                  <div className="process-connector-glow" />
                </div>
              )}
            </div>
          ))}
        </div>
      </DiagonalTransition>
    </div>
  );
}
