# Projet de site vitrine pour Vix Studio Web

## Objectif

Concevoir un site vitrine premium, immersif et expérientiel pour l’agence digitale Vix Studio Web. Le site doit être perçu comme un voyage visuel continu, sans aucune coupure ni rechargement, avec des transitions fluides, parfois asymétriques, et une forte cohérence artistique. Des images sont dispoibles dans le dossier `images/` pour le logo ou autre.

## Direction artistique et expérience utilisateur

🎨 Direction artistique globale :

- Palette principale : noir profond, jaune lumineux, blanc pur
- Style : futuriste, minimaliste, contrasté, élégant
- Ambiance : premium, technologique, dynamique

Utiliser :

- glow subtil jaune
- glassmorphism léger
- gradients animés discrets
- animations fluides (inertie, easing naturel)

Typographie large, moderne, avec animations d’apparition (reveal, mask, split text)
Le site doit donner une impression de maîtrise technique, de créativité et de fluidité absolue.

## Structure narrative et comportement du scroll

### 1 — Hero + expérience particules (scroll vertical)

Objectifs :

Afficher Vix, avec une phrase d’accroche marquante
Créer un effet “wow” immédiat avec les particules formant le logo. Attention à l'agencement pour ne pas trop superposer les particules et le texte.

Particules :

Les particules forment initialement le logo VIX (version sans fond, respect des couleurs noir/jaune/blanc), il faut un fond clair à cet endroit pour que les particules soient bien visibles.
Prévoir une commande claire pour reconstruire automatiquement le logo

L’utilisateur peut interagir :

- mouvement souris → attraction/répulsion
- clic → explosion de particules
- maintien clic → vortex / gravité
- déplacement rapide → traînée lumineuse
- Les particules changent légèrement de couleur selon la vitesse
- Performance fluide (60fps), rendu profond

Les particules se dispersent progressivement lorsque l'utilisateur fait défiler vers la section suivante

### 2 — Services proposés (scroll vertical)

Afficher plusieurs blocs représentant les services de VIX (exemples à créer si nécessaire) :
création de sites vitrines
identités visuelles
expériences interactives
optimisation UX/UI
refonte de marque digitale

Chaque bloc :

animation d’apparition fluide
effet magnétique au hover
icône ou visuel minimaliste animé

Faire en sorte de marquer une pause dans le scroll pour ralentir sur cette section lorsque tout les blocs sont vers le centre.

Transition vers la section suivante :
Le scroll doit progressivement dévier vers la droite, en s’inclinant doucement pour créer un mouvement diagonal bas-droite. L’effet doit être fluide, sans à-coups, donnant l’impression que la suite du site se déroule naturellement dans cette nouvelle direction. Les éléments de la section suivante peuvent commencer à apparaître subtilement pendant cette transition pour renforcer l’effet de continuité. Le titre de la section suivante se déplace assez rapidement puis une fois à la bonne place, se met à défiler lentement. Le fond lui ne doit pas être uniforme pour voir l'effet de déplacement diagonal, il peut être composé de formes géométriques ou de motifs discrets qui accentuent le mouvement.

### 3 — Processus de création d’un projet (toujours en scroll diagonal bas-droite)

Présenter les étapes :

- Échange & compréhension des objectifs
- Conception & design
- Développement
- Tests, retouches
- Lancement et entretien

Comportement :

Chaque bloc ralentit lorsqu’il est au centre de l’écran (focus)
Légère variation de vitesse entre les blocs (effet de profondeur)
Connexions visuelles entre les étapes (lignes animées, flux lumineux)

Transition:
Une fois la section entièrement terminée, le scroll redevient progressivement vertical classique pour préparer la section suivante.

### 4 — Audience (scroll vertical)

Cibles :

- commerces indépendants de tout genre
- événements
- projets souhaitant renforcer leur image digitale

Effets :

mise en avant par cartes interactives
apparition asymétrique
transitions souples

Transition : 
Puis le scroll devient progressivement diagonal bas-gauche, en miroir de la section 3. Utiliser le même angle, avec les mêmes éléments de fond pour renforcer la cohérence visuelle. Les éléments de la section suivante peuvent également commencer à apparaître pendant cette transition pour maintenir l’effet de continuité. Le titre de la section suivante se déplace assez rapidement puis une fois à la bonne place, se met à défiler lentement. Le fond lui ne doit pas être uniforme pour voir l'effet de déplacement diagonal, il peut être composé de formes géométriques ou de motifs discrets qui accentuent le mouvement.

### 5 — Présentation des réalisations de Vix (scroll diagonal bas-gauche)

Un projet à la fois
Changement progressif de thème visuel pour s’immerger dans l’univers du projet.
Le nom du projet se déplace rapidement pour atteindre l'espace central, puis ralentit pour se déplacer plus lentement que le scroll. Les autres éléments du projet (description, images) apparaissent progressivement avec des animations d’apparition fluides, pouvant avoir des vitesses de scroll légèrement différentes, tout en gérant bien les superpositions. Les images doivent être de grand format, et placées sur des lignes (diagonales comme le scroll) différentes. Le fond de chaque projet doit se transformer en même temps que l'arrivée du titre pour copier celui du projet en cours. Il faut que cela change les couleurs mais aussi les motifs de fond (avec une transition fluide).

Informations :

- Titre du projet
- Description courte
- images (depuis images/portfolio/<projet>/)
- Se baser sur le texte descriptif issu du fichier .txt
- lien optionnel vers le site

Transition :
Une fois la section terminée, retour sur un thème plus classique avec la palette de couleurs principale du projet, et le scroll redevient progressivement vertical classique pour préparer la section suivante.

### 6 — Présentation de l’équipe et contact (scroll vertical)

Contenu :

- Qui est VIX
- Vision et valeurs
- Parcours et expertise

Puis :

- Bouton principal “Démarrer un projet”
- animation physique (spring)
- effet glow au hover

Le bouton doit envoyé sur une page séparée avec un formulaire de contact classique avec les champs utiles, et donner une animation de confirmation d’envoi (ex: checkmark animé, ou message de remerciement avec une animation d’apparition). Le thème de cette page doit être plus épuré, tout en gardant une touche de dynamisme (ex: fond sombre avec des éléments lumineux animés très subtilement, ou un motif de fond léger). Il faut veiller à ce que cette page soit cohérente avec le reste du site, tout en étant suffisamment simple pour ne pas distraire l’utilisateur du formulaire de contact.

## Autres points intéressants

Le scroll doit légèrement ralentir lorsque le coeur d'une section se trouve quasiment au centre de l'écran, pour que l'utilisateur puisse profiter du contenu et de l'animation. Il faut veiller à ce que ce ralentissement soit subtil et fluide, sans créer de sensation de saccade ou de perte de contrôle du scroll. L'objectif est d'encourager l'utilisateur à s'attarder sur les éléments clés de chaque section, tout en maintenant une expérience de navigation fluide et agréable.

### Idées d’animations supplémentaires

curseur personnalisé
animations déclenchées à la visibilité
parallaxe multi-couches

#### ⚙️ Contraintes techniques

- Aucune coupure de navigation (SPA)
- 60fps constant
- Animations GPU-friendly (transform, opacity)
- Architecture modulaire et maintenable
- Responsive (mobile avec version simplifiée mais élégante)

Technologies recommandées

- GSAP + ScrollTrigger (gestion avancée du scroll et des timelines)
- Canvas ou WebGL pour les particules
- Lerp pour le lissage des mouvements
- Intersection Observer pour les triggers

#### 🎬 Objectif final

Le site doit :

- impressionner visuellement dès la première seconde
- raconter une histoire fluide et continue
- refléter un positionnement haut de gamme
- montrer une maîtrise technique avancée
- donner envie de lancer un projet avec VIX

Priorité absolue : fluidité, immersion, élégance, effet “wow” maîtrisé.
