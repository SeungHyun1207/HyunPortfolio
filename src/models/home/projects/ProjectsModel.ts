export interface Project {
  id: string;
  title: { ko: string; en: string };
  period: string;
  startYear: number;
  client: string;
  role: { ko: string; en: string };
  highlights: { ko: string[]; en: string[] };
  techStack: string[];
  category: 'react' | 'java' | 'other';
}

export type TabType = 'career' | 'personal' | 'vibe';
export type FilterType = 'all' | 'react' | 'java' | 'other';

export interface PersonalProject {
  id: string;
  title: { ko: string; en: string };
  description: { ko: string; en: string };
  techStack: string[];
  icon: string;
  badge: string;
  accentColor: string;
  path?: string;
  status: 'live' | 'wip' | 'planned';
}

export interface VibeProject {
  id: string;
  title: { ko: string; en: string };
  description: { ko: string; en: string };
  techStack: string[];
  icon: string;
  badge: string;
  accentColor: string;
  path?: string; // 있으면 클릭 시 해당 경로로 이동
}
