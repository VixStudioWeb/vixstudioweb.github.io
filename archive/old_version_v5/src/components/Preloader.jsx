import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const preloaderRef = useRef(null);
  const logoRef = useRef(null);
  const progressBarRef = useRef(null);
  const textRef = useRef(null);
  const assetsReadyRef = useRef(false);
  const minTimeReachedRef = useRef(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Fast to 50, slow to 90, then wait for assets
      const increment = current < 50 ? 4 : current < 80 ? 1.5 : 0.3;
      const max = assetsReadyRef.current ? 100 : 90;
      current = Math.min(current + increment, max);
      setProgress(Math.round(current));
    }, 50);

    // Preload key assets
    const preloadAssets = () => {
      const assetUrls = [
        '/images/logo.png',
        '/images/cheetah_no_bg.png',
      ];

      const promises = assetUrls.map(
        (url) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve; // Don't block on errors  
            img.src = url;
          })
      );

      // Also wait for fonts
      if (document.fonts && document.fonts.ready) {
        promises.push(document.fonts.ready);
      }

      Promise.all(promises).then(() => {
        assetsReadyRef.current = true;
      });
    };

    preloadAssets();

    // Minimum display time (1.5s) so preloader doesn't flash
    const minTimer = setTimeout(() => {
      minTimeReachedRef.current = true;
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(minTimer);
    };
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    
    // Wait for minimum display time before exit animation
    const checkAndExit = () => {
      if (!minTimeReachedRef.current) {
        const retryTimer = setTimeout(checkAndExit, 100);
        return () => clearTimeout(retryTimer);
      }

      const tl = gsap.timeline({
        onComplete: () => onComplete?.(),
      });

      tl.to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in',
      })
        .to(
          logoRef.current,
          {
            scale: 1.2,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.in',
          },
          '-=0.1'
        )
        .to(
          progressBarRef.current,
          {
            scaleX: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
          },
          '-=0.4'
        )
        .to(preloaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
        });
    };

    const timer = setTimeout(checkAndExit, 300);
    return () => clearTimeout(timer);
  }, [progress, onComplete]);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    gsap.fromTo(
      logo,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.1 }
    );

    gsap.to(logo, {
      filter: 'drop-shadow(0 0 20px rgba(245,197,24,0.4)) drop-shadow(0 0 40px rgba(245,197,24,0.2))',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <div ref={preloaderRef} className="preloader">
      <div className="preloader-content">
        <div ref={logoRef} className="preloader-logo">
          <img src="/images/logo.png" alt="Vix Studio Web" />
        </div>
        <div ref={textRef} className="preloader-text">
          <span className="preloader-percentage">{progress}%</span>
        </div>
        <div className="preloader-progress-track">
          <div
            ref={progressBarRef}
            className="preloader-progress-bar"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>
      <div className="preloader-bg-shapes">
        <div className="preloader-shape preloader-shape-1" />
        <div className="preloader-shape preloader-shape-2" />
        <div className="preloader-shape preloader-shape-3" />
      </div>
    </div>
  );
}
