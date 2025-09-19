import type { Project } from '../types';
import type { TFunction } from 'i18next';

export const getProjectsData = (t: TFunction): Project[] => [
  {
    id: 1,
    title: t('projects.data.playsport.title'),
    description: t('projects.data.playsport.description'),
    image: "/assets/images/projects/PlaySport.png",
    tech: ["React", "TypeScript", "Redux", "Google Maps", "Leaflet", "PWA"],
    category: ["web", "sport"],
    year: 2025,
    status: "completed",
    demoUrl: "https://stage.playsport.com.ua/",
    repoUrl: undefined,
    highlights: t('projects.data.playsport.highlights', { returnObjects: true }) as string[],
    featured: true
  }
];

// Deprecated: use getProjectsData instead
export const projectsData: Project[] = [
  {
    id: 1,
    title: "PlaySport - Спортивна платформа",
    description: "Спортивна платформа для бронювання спортивних об'єктів з інтерактивною картою, системою платежів та управлінням тренуваннями.",
    image: "/assets/images/projects/PlaySport.png",
    tech: ["React", "TypeScript", "Redux", "Google Maps", "Leaflet", "PWA"],
    category: ["web", "sport"],
    year: 2025,
    status: "completed",
    demoUrl: "https://stage.playsport.com.ua/",
    repoUrl: undefined,
    highlights: [
      "Виправив QA баги пов'язані зі стилями та мобільним відображенням",
      "Створив сторінку для перегляду минулих тренувальних сесій",
      "Розробив переиспользуємі компоненти: confirm dialog, dateRangeSelector, filter, search",
      "Створив сторінку для перегляду платежів",
      "Додав можливість перемикання між Google Maps та Leaflet Maps використовуючи factory pattern",
      "Додав пагінацію (Front End)",
      "Підключив PWA функціональність"
    ],
    featured: true
  }
];