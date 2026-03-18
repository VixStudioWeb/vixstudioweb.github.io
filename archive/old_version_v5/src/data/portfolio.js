const portfolio = [
  {
    id: 'coursebabets',
    title: 'La Course des Babets',
    description:
      "Site vitrine pour la course organisée à Saint-Étienne par le club du Coquelicot 42. Différents parcours proposés pour tous les profils. Le design se fond avec le thème de la course avec des animations liées au thème et conduit vers les plateformes d'inscription.",
    link: 'https://lacoursedesbabets.fr',
    theme: {
      primary: '#2d6a4f',
      secondary: '#8b5e3c',
      background: '#f5f5f0',
      text: '#1a1a1a',
      accent: '#2d6a4f',
      pattern: 'forest',
    },
    images: [
      '/images/portfolio/coursebabets/coursebabets_frontpage.png',
      '/images/portfolio/coursebabets/course_babets_ex.png',
      '/images/portfolio/coursebabets/course_babets_ex_phone.png',
    ],
  },
  {
    id: 'pyvolley',
    title: 'PyVolley',
    description:
      "Plateforme donnant accès gratuitement et de façon simplifiée à toutes les statistiques des matchs fédéraux de volley en France. Exploration de base de données, recherche de clubs, joueurs, arbitres et équipes. Interface intuitive et claire.",
    link: null,
    theme: {
      primary: '#1a73e8',
      secondary: '#e53935',
      background: '#0d1117',
      text: '#f5f5f5',
      accent: '#1a73e8',
      pattern: 'geometric',
    },
    images: [
      '/images/portfolio/pyvolley/pyvolley_front.png',
      '/images/portfolio/pyvolley/pyvolley_info_match.png',
      '/images/portfolio/pyvolley/pyvolley_simu_match.png',
    ],
  },
];

export default portfolio;
