export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

/* Типи секції «Проєкти» — використовуються, коли SHOW_PROJECTS = true */

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  category: string[];
  year: number;
  status: 'completed' | 'in-progress';
  demoUrl?: string;
  repoUrl?: string;
  highlights: string[];
  featured: boolean;
}

export type FilterType = 'all' | 'web' | 'sport' | 'mobile' | 'ui' | 'open-source';
export type SortType = 'date' | 'name' | 'tech';
