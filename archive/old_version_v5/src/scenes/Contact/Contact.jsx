import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import AnimatedText from '../../components/AnimatedText';
import useThemeStore from '../../store/useThemeStore';
import './contact.css';

export default function Contact() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const pageRef = useRef(null);
  const resetTheme = useThemeStore((s) => s.resetTheme);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    project: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Generate stable random dot positions
  const bgDots = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      left: `${(i * 8.3 + 5 + (i * 7) % 13) % 100}%`,
      top: `${(i * 7.1 + 10 + (i * 11) % 17) % 100}%`,
      delay: `${i * 0.3}s`,
    })), []);

  // Reset body background when entering contact page
  useEffect(() => {
    resetTheme();
  }, [resetTheme]);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      // Page entrance
      gsap.fromTo(
        page,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }
      );

      // Form fields stagger in
      const fields = page.querySelectorAll('.form-group');
      gsap.fromTo(
        fields,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.3,
          ease: 'power3.out',
        }
      );

      // Animated background particles (subtle)
      const dots = page.querySelectorAll('.contact-bg-dot');
      dots.forEach((dot, i) => {
        gsap.to(dot, {
          y: `random(-30, 30)`,
          x: `random(-20, 20)`,
          duration: `random(4, 8)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.5,
        });
      });
    }, page);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    if (!formData.project) newErrors.project = 'Sélectionnez un type de projet';
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Shake the form
      gsap.to(formRef.current, {
        x: [-8, 8, -6, 6, -3, 3, 0],
        duration: 0.5,
        ease: 'power2.out',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission (TODO: connect to Formspree/EmailJS)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Animate success
    const form = formRef.current;
    if (form) {
      gsap.to(form, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in',
      });
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div ref={pageRef} className="contact-page">
      {/* Subtle background decoration */}
      <div className="contact-bg" aria-hidden="true">
        {bgDots.map((dot, i) => (
          <div
            key={i}
            className="contact-bg-dot"
            style={{
              left: dot.left,
              top: dot.top,
              animationDelay: dot.delay,
            }}
          />
        ))}
      </div>

      <div className="contact-container">
        <button
          className="contact-back"
          onClick={handleBack}
          data-cursor-hover
        >
          ← Retour
        </button>

        <div className="contact-header">
          <AnimatedText
            text="Démarrer un projet"
            tag="h1"
            animation="reveal"
            className="contact-title"
            scrollTrigger={false}
          />
          <AnimatedText
            text="Parlez-nous de votre vision, nous la concrétisons"
            tag="p"
            animation="fade"
            delay={0.3}
            className="contact-subtitle"
            scrollTrigger={false}
          />
        </div>

        {!isSubmitted ? (
          <form
            ref={formRef}
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="form-row">
              <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                <label htmlFor="name">Nom complet *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <span id="name-error" className="form-error" role="alert">{errors.name}</span>}
              </div>
              <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <span id="email-error" className="form-error" role="alert">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company">Entreprise / Projet</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nom de votre entreprise ou projet"
                />
              </div>
              <div className="form-group">
                <label htmlFor="budget">Budget estimé</label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="">Sélectionnez</option>
                  <option value="< 1000€">&lt; 1 000€</option>
                  <option value="1000-3000€">1 000€ – 3 000€</option>
                  <option value="3000-5000€">3 000€ – 5 000€</option>
                  <option value="5000-10000€">5 000€ – 10 000€</option>
                  <option value="> 10000€">&gt; 10 000€</option>
                </select>
              </div>
            </div>

            <div className={`form-group ${errors.project ? 'has-error' : ''}`}>
              <label htmlFor="project">Type de projet *</label>
              <select
                id="project"
                name="project"
                value={formData.project}
                onChange={handleChange}
                aria-describedby={errors.project ? 'project-error' : undefined}
              >
                <option value="">Que recherchez-vous ?</option>
                <option value="site-vitrine">Site vitrine</option>
                <option value="identite-visuelle">Identité visuelle</option>
                <option value="experience-interactive">Expérience interactive</option>
                <option value="refonte">Refonte digitale</option>
                <option value="autre">Autre</option>
              </select>
              {errors.project && <span id="project-error" className="form-error" role="alert">{errors.project}</span>}
            </div>

            <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
              <label htmlFor="message">Votre message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Décrivez votre projet, vos objectifs, vos idées..."
                rows={6}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && <span id="message-error" className="form-error" role="alert">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className="btn-glow contact-submit"
              disabled={isSubmitting}
              data-cursor-hover
            >
              {isSubmitting ? (
                <span className="submit-loading">
                  <span className="loading-dot" />
                  <span className="loading-dot" />
                  <span className="loading-dot" />
                </span>
              ) : (
                <>Envoyer le message</>
              )}
            </button>
          </form>
        ) : (
          <div className="contact-success">
            <div className="success-checkmark">
              <svg viewBox="0 0 52 52" className="checkmark-svg">
                <circle
                  className="checkmark-circle"
                  cx="26"
                  cy="26"
                  r="24"
                  fill="none"
                />
                <path
                  className="checkmark-check"
                  fill="none"
                  d="M14 27l7 7 16-16"
                />
              </svg>
            </div>
            <h2 className="success-title">Message envoyé !</h2>
            <p className="success-text">
              Merci pour votre message. Nous reviendrons vers vous rapidement
              pour discuter de votre projet.
            </p>
            <button
              className="btn-glow"
              onClick={handleBack}
              data-cursor-hover
            >
              Retour à l'accueil
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
