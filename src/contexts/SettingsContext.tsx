import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type ThemeMode = 'dark' | 'light';
type Language = 'ko' | 'en';

interface SettingsContextType {
  theme: ThemeMode;
  language: Language;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as ThemeMode) || 'dark';
    }
    return 'dark';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'ko';
    }
    return 'ko';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key] ?? key;
  };

  // Tailwind dark mode: HTML 요소에 'dark' 클래스 토글
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <SettingsContext.Provider value={{ theme, language, setTheme, setLanguage, t }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

/**
 * 공통 번역 데이터 (nav, settings, footer)
 * 페이지별 번역은 각 페이지의 *.i18n.ts 파일에서 관리
 */
const translations: Record<Language, Record<string, string>> = {
  ko: {
    // Navigation
    'nav.devInfo': '개발자 소개',
    'nav.skills': '기술 스택',
    'nav.projects': '프로젝트',
    'nav.experience': '경력',
    'nav.contact': '연락처',
    'nav.devInfoDesc': '개발자 소개',
    'nav.skillsDesc': '기술 스택',
    'nav.projectsDesc': '프로젝트',
    'nav.experienceDesc': '경력 사항',
    'nav.contactDesc': '연락처',
    'nav.menu': '메뉴',
    'nav.close': '닫기',
    'nav.fullMenu': '전체 메뉴',
    'nav.goHome': '홈으로 이동',
    'nav.openMenu': '전체 메뉴 열기',
    'nav.closeMenu': '메뉴 닫기',

    // Settings
    'settings.title': '설정',
    'settings.theme': '테마',
    'settings.language': '언어',
    'settings.dark': '다크 모드',
    'settings.light': '라이트 모드',
    'settings.korean': '한국어',
    'settings.english': 'English',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.role': '프론트엔드 개발자',
  },
  en: {
    // Navigation
    'nav.devInfo': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'nav.devInfoDesc': 'Developer Introduction',
    'nav.skillsDesc': 'Tech Stack',
    'nav.projectsDesc': 'Projects',
    'nav.experienceDesc': 'Career & Education',
    'nav.contactDesc': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.fullMenu': 'Full Menu',
    'nav.goHome': 'Go to Home',
    'nav.openMenu': 'Open Full Menu',
    'nav.closeMenu': 'Close Menu',

    // Settings
    'settings.title': 'Settings',
    'settings.theme': 'Theme',
    'settings.language': 'Language',
    'settings.dark': 'Dark Mode',
    'settings.light': 'Light Mode',
    'settings.korean': '한국어',
    'settings.english': 'English',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.role': 'Frontend Developer',
  },
};

export default SettingsContext;
