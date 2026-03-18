# Avancement du Projet — Vix Studio Web

## État : Phase 2 finalisée — Site production-ready avec UX avancée

---

## ✅ RÉALISÉ

### Infrastructure
- [x] Projet Vite + React initialisé
- [x] Configuration build & dev server
- [x] Déploiement GitHub Pages (GitHub Actions workflow)
- [x] SPA routing avec react-router-dom + 404.html redirect
- [x] `.gitignore` configuré
- [x] SEO complet : Open Graph, Twitter Cards, Structured Data (JSON-LD)
- [x] Preloader avec progression réelle + temps minimum d'affichage
- [x] Transitions de page animées (fondu + overlay)
- [x] Performance monitoring (`performanceMonitor.js`) — détection auto du tier
- [x] Images déplacées dans `public/images/` pour inclusion correcte dans le build
- [x] Favicon 32px, icônes PWA 192/512px, Apple Touch Icon 180px
- [x] `manifest.json` pour Progressive Web App basique

### Styles globaux
- [x] Variables CSS (palette noir/jaune/blanc, glassmorphism, glow, z-index)
- [x] Typographie (Space Grotesk titres, Inter corps)
- [x] Globals (reset, glassmorphism cards, bouton glow, scrollbar, responsive)
- [x] Skip-to-content link (accessibilité clavier)
- [x] `:focus-visible` ring global (accessibilité clavier)

### Composants réutilisables
- [x] `CustomCursor` — curseur personnalisé avec états hover/click, lerp smooth, `cursor:none` uniquement sur desktop (hover:hover)
- [x] `AnimatedText` — 3 modes : reveal (mask), split (char-by-char), fade
- [x] `SectionContainer` — wrapper de section
- [x] `GlowCard` — carte glassmorphism avec tracking souris pour glow, ref forwarding corrigé (merge magneticRef + externalRef)
- [x] `DiagonalTransition` — transition diagonale (droite/gauche) avec motifs géométriques + angle correctement scopé
- [x] `Header` — navigation flottante glassmorphism avec apparition après le hero, section active tracking, burger responsive, navigation smooth vers ancres, aria-labels complets, aria-expanded burger
- [x] `Preloader` — écran de chargement avec progression, animation logo, preload assets clés (logo, mascotte, fonts)
- [x] `PageTransition` — transition inter-page avec overlay animé, fix re-renders inutiles via ref

### Hooks & Utilitaires
- [x] `useMagneticEffect` — effet magnétique au hover
- [x] `useSectionProgress` — tracking IntersectionObserver
- [x] `lerp`, `clamp`, `helpers` (distance, mapRange, debounce, throttle)
- [x] `performanceMonitor` — getPerformanceTier, shouldReduceMotion, getParticleCount, startFPSMonitor

### Stores (Zustand)
- [x] `useScrollStore` — scroll progress, direction, section courante, vélocité
- [x] `useThemeStore` — thème dynamique pour portfolio avec transition body background + guard doublons
- [x] `usePortfolioStore` — projet actif

### Données
- [x] `services.js` — 5 services avec icônes
- [x] `processSteps.js` — 5 étapes du processus
- [x] `portfolio.js` — 2 projets (coursebabets, pyvolley) avec thèmes, patterns et images
- [x] `audience.js` — 3 cibles

### Section 1 — Hero + Particules
- [x] Canvas plein écran avec système de particules
- [x] Particules forment le logo VIX depuis `images/logo.png`
- [x] Interactions souris : attraction/répulsion, clic explosion, maintien vortex
- [x] Traînée lumineuse en mouvement rapide
- [x] Changement de couleur selon vélocité
- [x] Dispersion progressive au scroll via ScrollTrigger
- [x] Texte d'accroche animé (split chars + fade)
- [x] Indicateur de scroll animé
- [x] Fond clair (gradient) pour visibilité des particules
- [x] Bouton de reconstruction du logo (+ raccourci clavier R)
- [x] Adaptation nombre de particules selon performance tier

### Section 2 — Services
- [x] 5 cartes glassmorphism avec icônes SVG animées
- [x] Entrée staggered au scroll
- [x] Effet magnétique au hover
- [x] Pin scroll (pause brève quand les blocs sont centrés)
- [x] Tracking souris pour glow

### Section 3 — Processus (Diagonal droite)
- [x] 5 étapes avec numérotation, icônes, descriptions
- [x] Wrapped dans `DiagonalTransition direction="right"`
- [x] Connecteurs lumineux entre étapes
- [x] Effet focus (scale + glow) quand étape centrée
- [x] Motifs géométriques de fond animés

### Section 4 — Audience
- [x] 3 cartes interactives avec icônes
- [x] Entrée asymétrique (directions différentes)
- [x] Parallaxe subtile entre cartes
- [x] Tracking souris pour glow

### Section 5 — Portfolio (Diagonal gauche)
- [x] Wrapped dans `DiagonalTransition direction="left"`
- [x] 2 projets (Course des Babets, PyVolley)
- [x] Titre slide in rapide puis ralentit (scrub)
- [x] Images grand format avec parallaxe et stagger
- [x] Changement de thème dynamique via Zustand + transition body
- [x] Pattern SVG spécifique par projet (forest / geometric)
- [x] Lien externe optionnel (bouton glow)

### Section 6 — À propos + Contact
- [x] 3 blocs (Vision, Valeurs, Expertise) avec animations d'entrée
- [x] Mascotte guépard avec parallaxe et glow
- [x] Bouton CTA "Démarrer un projet" avec animation spring (elastic)
- [x] Footer avec logo cliquable, liens de navigation fonctionnels (smooth scroll), copyright
- [x] Footer avec `role="contentinfo"`, `aria-label`, `<nav>` sémantique

### Page Contact (route séparée `/contact`)
- [x] Formulaire complet (nom, email, entreprise, budget, type, message)
- [x] Design épuré avec fond sombre et dots lumineux animés (positions stables)
- [x] Validation client complète avec messages d'erreur inline + animation shake
- [x] Animation de soumission (loading dots)
- [x] Animation de confirmation (checkmark SVG animé)
- [x] Reset du thème body au montage (guard si arrivée depuis portfolio)
- [x] Bouton retour
- [x] Responsive

### Navigation & UX globale
- [x] Navigation flottante avec section active indicator
- [x] Soft-snap vers le centre de section quand le scroll s'arrête
- [x] Scroll smooth vers ancres depuis le header ET le footer
- [x] Support retour au hero depuis la page contact
- [x] Preloader avec preload des assets critiques

### Routing & Architecture
- [x] `App.jsx` — composition de toutes les sections via `<main id="main-content">`
- [x] `Router.jsx` — routes `/` et `/contact` + Header + Preloader + PageTransition
- [x] `ScrollController.jsx` — gestion globale scroll, velocity tracking, soft-snap, GSAP defaults
- [x] Navigation smooth vers ancres (#hero, #services, etc.)

---

## 🐛 BUGS CORRIGÉS (Phase 2)

1. **`ReferenceError: angle is not defined`** — Variable `angle` définie dans `useEffect` mais utilisée dans le JSX de `DiagonalTransition.jsx`. Corrigé en ajoutant `const angle = isRight ? -8 : 8;` dans le scope render.

2. **PageTransition re-renders** — `children` dans les deps du `useEffect` causait des ré-animations. Corrigé en utilisant un `ref` pour les children pendants et en ne déclenchant que sur `locationKey`.

3. **Preloader timing** — Le preloader vérifiait `document.querySelectorAll('img')` avant que React n'ait rendu les images. Corrigé en preloadant les assets critiques directement et en ajoutant un temps minimum de 1.5s.

4. **`cursor: none` sur mobile** — Le CSS appliquait `cursor: none !important` partout, y compris sur mobile. Corrigé avec `@media (hover: hover) and (pointer: fine)`.

5. **Header ScrollTo** — Import manquant de `ScrollToPlugin` dans le Header. Ajouté.

6. **Theme store doublons** — `setTheme` et `resetTheme` pouvaient se déclencher inutilement. Ajout de guards pour éviter les transitions quand le thème est déjà actif.

7. **Images absentes en production** — Le dossier `images/` était à la racine du projet et non dans `public/`, donc non inclus dans le build Vite. Déplacé dans `public/images/` avec symlink de compatibilité.

8. **Footer non-fonctionnel** — Les liens du footer étaient de simples `<a href="#section">` sans handler de smooth scroll. Corrigé avec `handleFooterNav` + GSAP ScrollToPlugin.

9. **GlowCard ref perdu** — Quand `magnetic=true`, le `externalRef` (forwarded ref) était ignoré au profit du `magneticRef`. Corrigé avec un merge de refs via `useCallback`.

10. **Contact bg-dots instables** — Les positions des points décoratifs utilisaient `Math.random()` inline, causant des repositionnements à chaque re-render. Remplacé par des positions déterministes stables via `useMemo`.

11. **Body background non-reset** — En naviguant vers `/contact` depuis le portfolio, le body pouvait garder la couleur de fond du dernier projet. Ajout d'un `resetTheme()` au montage du composant Contact.

---

## 🔧 AMÉLIORATIONS À APPORTER (Phase 3)

### Priorité haute
1. **Formulaire de contact backend** — Connecter le formulaire à un service d'envoi d'email (Formspree, EmailJS, ou API custom). Actuellement le formulaire simule l'envoi avec un délai de 1.5s.

2. **Optimisation images** — Les images sont servies en taille originale. Le `logo.png` fait 3.5MB (très lourd). Actions recommandées :
   - Compresser le logo ou le convertir en SVG
   - Générer des versions WebP/AVIF des images portfolio
   - Ajouter `srcset` responsive pour les images portfolio
   - Utiliser `logo_low_quality.png` (777KB) pour le preloader et le header

3. **Vrai scroll diagonal** — Le mouvement diagonal est simulé via `skewY`. Pour un vrai scroll diagonal, implémenter un `ScrollTrigger` custom qui translate le container sur les axes X et Y simultanément, avec un `lerp` pour la fluidité.

4. **Performance particules WebGL** — Pour > 3000 particules, migrer vers WebGL (Three.js ou raw WebGL) avec des shaders custom. Le canvas 2D actuel est limité à ~2000-3000 particules à 60fps.

### Priorité moyenne
5. **Parallaxe multi-couches** — Ajouter un composant `ParallaxLayer` qui crée des couches de parallaxe avec des vitesses différentes pour enrichir la profondeur visuelle. Structure prévue dans structure.md mais non implémentée.

6. **Version mobile enrichie** — Sur mobile, les animations sont simplifiées mais fonctionnelles. Ajouter des micro-interactions tactiles (swipe pour le portfolio, tap pour explorer les particules). Le burger menu fonctionne mais les gestes tactiles manquent.

7. **Animations de timeline centralisées** — La structure originale prévoyait un dossier `animations/` avec des timelines séparées (`heroTimeline.js`, `servicesTimeline.js`, etc.). Actuellement la logique d'animation est inline dans chaque composant. Un refactoring améliorerait la maintenabilité.

8. **Lenis smooth scroll** — La structure originale prévoyait `useLenisScroll.js`. Lenis offre un scroll plus fluide et naturel que le scroll natif. À considérer pour remplacer le scroll natif + GSAP ScrollToPlugin.

### Priorité basse
9. **Tests** — Aucun test unitaire ou e2e n'est en place. Considérer Vitest + Testing Library pour les composants, Playwright pour les tests e2e.

10. **Analytics** — Ajouter un tracking respectueux de la vie privée (Plausible ou similaire).

11. **Internationalisation** — Le site est en français uniquement. Si besoin de support multilingue, prévoir i18n.

12. **Contraste WCAG** — Vérifier le ratio de contraste des textes gris sur fond sombre (certains `var(--color-gray)` sur `var(--color-black)` pourraient être en dessous du seuil AA).

---

## 📁 Structure des fichiers

```
src/
├── main.jsx                           # Point d'entrée React
├── app/
│   ├── App.jsx                        # Composition des sections
│   ├── Router.jsx                     # BrowserRouter + routes + Header + Preloader
│   └── ScrollController.jsx           # Gestion globale du scroll + soft-snap
├── components/
│   ├── AnimatedText.jsx               # Texte animé (reveal/split/fade)
│   ├── CustomCursor.jsx + .css        # Curseur personnalisé
│   ├── DiagonalTransition.jsx + .css  # Transition diagonale
│   ├── GlowCard.jsx + .css            # Carte glassmorphism
│   ├── Header.jsx + .css              # Navigation flottante
│   ├── PageTransition.jsx + .css      # Transition inter-page
│   ├── Preloader.jsx + .css           # Écran de chargement
│   └── SectionContainer.jsx           # Wrapper section
├── data/
│   ├── audience.js
│   ├── portfolio.js
│   ├── processSteps.js
│   └── services.js
├── hooks/
│   ├── useMagneticEffect.js
│   └── useSectionProgress.js
├── scenes/
│   ├── About/                         # Section à propos + footer
│   ├── Audience/                      # Section cibles
│   ├── Contact/                       # Page contact (route /contact)
│   ├── HeroParticles/                 # Hero + système particules canvas
│   ├── Portfolio/                     # Portfolio + thèmes dynamiques
│   ├── Process/                       # Processus (diagonal droite)
│   └── Services/                      # Services (cartes glassmorphism)
├── store/
│   ├── usePortfolioStore.js
│   ├── useScrollStore.js
│   └── useThemeStore.js
├── styles/
│   ├── globals.css
│   ├── typography.css
│   └── variables.css
└── utils/
    ├── clamp.js
    ├── helpers.js
    ├── lerp.js
    └── performanceMonitor.js
```

## 🚀 Commandes

```bash
npm install      # Installation des dépendances
npm run dev      # Serveur de développement (port 3000)
npm run build    # Build production (→ dist/)
npm run preview  # Prévisualiser le build
```

Le déploiement se fait automatiquement via GitHub Actions à chaque push sur `main`.
