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

export interface SkillCard {
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon?: React.ReactNode;
}

export interface TimelineItem {
  id: number;
  title: string;
  company: string;
  date: string;
  description: string;
  achievements: string[];
  type: 'work' | 'education' | 'project';
}


export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface NavigationItem {
  href: string;
  label: string;
  active?: boolean;
}

export type FilterType = 'all' | 'web' | 'sport' | 'mobile' | 'ui' | 'open-source';
export type SortType = 'date' | 'name' | 'tech';