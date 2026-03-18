# Structure du projet

src/
│
├── app/
│   ├── App.jsx
│   ├── Router.jsx (si besoin de routes internes)
│   └── ScrollController.jsx   ← contrôle global du scroll
│
├── scenes/                     ← sections majeures (1 scène = 1 section)
│   ├── HeroParticles/
│   │   ├── HeroParticles.jsx
│   │   ├── ParticlesCanvas.jsx
│   │   ├── useParticles.js
│   │   └── hero.module.css
│   │
│   ├── Services/
│   ├── Process/
│   ├── Audience/
│   ├── Portfolio/
│   └── About/
│
├── components/                 ← composants UI réutilisables
│   ├── SectionContainer.jsx
│   ├── AnimatedText.jsx
│   ├── GlowCard.jsx
│   ├── CustomCursor.jsx
│   └── ParallaxLayer.jsx
|   └── ... (autres composants génériques)
│
├── animations/                 ← logique GSAP centralisée
│   ├── timelines/
│   │   ├── heroTimeline.js
│   │   ├── servicesTimeline.js
│   │   ├── processTimeline.js
│   │   └── portfolioTimeline.js
│   │
│   ├── scroll/
│   │   ├── verticalScroll.js
│   │   ├── diagonalScroll.js
│   │   └── horizontalScroll.js
│   │
│   └── transitions/
│       ├── sectionMorph.js
│       └── themeTransition.js
│       └── ... (autres transitions)
│
├── three/                      ← logique Three.js / R3F
│   ├── ParticlesSystem.jsx
│   ├── shaders/
│   │   ├── particleVertex.glsl
│   │   └── particleFragment.glsl
│   └── LogoFormation.js
│
├── hooks/
│   ├── useLenisScroll.js
│   ├── useScrollDirection.js
│   ├── useSectionProgress.js
│   └── useMagneticEffect.js
│
├── store/                      ← état global (Zustand)
│   ├── useScrollStore.js
│   ├── useThemeStore.js
│   └── usePortfolioStore.js
│
├── data/
│   ├── services.js
│   ├── processSteps.js
│   └── portfolio.json
│
├── assets/
│   ├── images/
│   │   └── portfolio/
│   └── logo/
│
├── styles/
│   ├── globals.css
│   ├── variables.css          ← couleurs noir/jaune/blanc
│   └── typography.css
│
└── utils/
    ├── lerp.js
    ├── clamp.js
    ├── preloadAssets.js
    └── performanceMonitor.js