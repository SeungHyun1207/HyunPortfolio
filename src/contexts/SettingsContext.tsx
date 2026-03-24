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
 * 번역 데이터
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

    // Hero
    'hero.greeting': '안녕하세요',
    'hero.intro': '저는',
    'hero.introName': '승현',
    'hero.introSuffix': '입니다.',
    'hero.description':
      '사용자 경험을 최우선으로 생각하며,\n클린 코드와 모던 기술로 가치를 만드는 개발자입니다.',
    'hero.aboutMe': '소개 보기',
    'hero.contact': '연락하기',
    'hero.scroll': '스크롤',

    // About
    'about.label': '소개',
    'about.title1': '코드로 가치를 만드는',
    'about.title2': '프론트엔드 개발자',
    'about.description1':
      'JavaScript · HTML · CSS로 시작해 4년간 프론트엔드 실무를 쌓아온 개발자입니다. 현재는 React · TypeScript · Vite를 주력으로 사용하며, LG전자 · KT DS 등 대기업 프로젝트에 참여해 복잡한 비즈니스 요구사항을 직관적인 사용자 경험으로 풀어내고 있습니다.',
    'about.description2':
      '단순히 동작하는 코드가 아닌, 팀이 함께 유지보수할 수 있는 구조를 고민합니다. 컴포넌트 설계부터 상태 관리, 성능 최적화까지 — 오래 쓸 수 있는 프론트엔드를 만드는 것을 즐깁니다.',
    'about.description3':
      'AI를 적극 활용해 아이디어를 빠르게 실험하고, 혼자서도 완성도 높은 프로덕트를 만들어냅니다. 기술의 한계보다 가능성에 집중하며, 끊임없이 새로운 것을 만들고 싶은 개발자입니다.',
    'about.status.company': '(주)제타소프트 재직중',
    'about.status.career': '프론트엔드 4년차',
    'about.status.location': '서울시 거주',
    'about.status.seeking': '이직 준비중',
    'about.mainTech': '주력 기술',
    'about.libraries': '주요 라이브러리',
    'about.highlight1.title': '대기업 프로젝트 실무 경험',
    'about.highlight1.desc': 'LG전자 · KT DS 등 SI/SM 프로젝트 다수 참여',
    'about.highlight2.title': 'UI 컴포넌트 라이브러리 구축',
    'about.highlight2.desc': '사내 표준 컴포넌트 설계 및 팀 전체 생산성 향상',
    'about.highlight3.title': 'AI 협업 개발',
    'about.highlight3.desc': 'AI를 활용한 빠른 프로토타이핑과 아이디어 실현',

    // Skills
    'skills.label': '기술',
    'skills.title1': '기술',
    'skills.title2': '스택',
    'skills.description': '지속적인 학습과 실무 경험을 통해 다양한 기술을 습득했습니다',
    'skills.mainTech': '주로 사용하는 기술',

    // Projects
    'projects.label': '포트폴리오',
    'projects.title1': '주요',
    'projects.title2': '프로젝트',
    'projects.description': '다양한 기술 스택을 활용하여 구현한 프로젝트들입니다',
    'projects.careerTab': '경력 프로젝트',
    'projects.personalTab': '개인 프로젝트',
    'projects.vibeTab': '바이브 프로젝트',
    'projects.filterAll': '전체',
    'projects.personalEmpty.title': '개인 프로젝트 준비 중',
    'projects.personalEmpty.desc': '사이드 프로젝트와 개인 작업물을 차근차근 추가할 예정입니다.',
    'projects.vibeDesc': 'AI 바이브 코딩으로 만든 실험적 프로젝트들입니다',

    // Experience
    'experience.label': '경력',
    'experience.title1': '경력',
    'experience.title2': '& 학력',
    'experience.description': '개발자로서 걸어온 길과 성장의 발자취입니다',
    'experience.workTitle': '경력 사항',
    'experience.eduTitle': '학력',
    'experience.certTitle': '자격증',
    'experience.festivalTitle': '참여 행사',
    'experience.work1.title': '프론트엔드 개발자',
    'experience.work1.org': '(주)제타소프트',
    'experience.work1.period': '2022.02 - 현재',
    'experience.work1.desc1': 'React, TypeScript를 활용한 대규모 웹 애플리케이션 개발',
    'experience.work1.desc2': 'LG전자, KT DS 등 대기업 프로젝트 다수 참여',
    'experience.work1.desc3': 'QlikSense BI 도구 커스터마이징 및 마이그레이션',
    'experience.work1.desc4': '사내 표준 UI 컴포넌트 라이브러리 설계·개발',
    'experience.edu1.title': '컴퓨터 정보통신과',
    'experience.edu1.org': '국제대학교',
    'experience.edu1.period': '2015.03.02 - 2019.02.13',
    'experience.edu1.desc1': '컴퓨터 정보통신 전공 전문학사 학위 취득',
    'experience.edu1.desc2': '네트워크, 운영체제, 프로그래밍 기초 수강',
    'experience.edu2.title': 'ICT융합공학부 컴퓨터공학전공',
    'experience.edu2.org': '안양대학교',
    'experience.edu2.period': '2019.03.04 - 2021.02.19',
    'experience.edu2.desc1': '컴퓨터공학 전공 학사 학위 취득',
    'experience.edu2.desc2': '알고리즘, 자료구조, 소프트웨어 공학 수강',
    'experience.edu2.desc3': '졸업 프로젝트: AI 기반 추천 시스템 개발',
    'experience.festival1.name': 'AI FESTA 2025',
    'experience.festival1.org': 'AI FESTA',
    'experience.festival1.year': '2025',
    'experience.festival1.desc': 'AI 최신 트렌드 및 기술 동향 탐색, 다양한 AI 서비스 체험',
    'experience.festival2.name': 'AI 관련 행사 2026',
    'experience.festival2.org': 'AI 컨퍼런스',
    'experience.festival2.year': '2026',
    'experience.festival2.desc': 'AI 기술 컨퍼런스 참가 및 네트워킹',
    'experience.cert1.name': '정보처리기사',
    'experience.cert1.org': '한국산업인력공단',
    'experience.cert2.name': 'AWS Certified Developer',
    'experience.cert2.org': 'Amazon',

    // Contact
    'contact.label': '연락처',
    'contact.title1': '함께',
    'contact.title2': '일해요',
    'contact.description': '프로젝트 협업이나 채용 관련 문의는 언제든지 환영합니다',
    'contact.infoTitle': '연락처 정보',
    'contact.emailValue': 'seunghyun_1207@naver.com',
    'contact.followMe': '팔로우',
    'contact.formTitle': '메시지 보내기',
    'contact.nameLabel': '이름',
    'contact.emailLabel': '이메일',
    'contact.messageLabel': '메시지',
    'contact.namePlaceholder': '홍길동',
    'contact.messagePlaceholder': '프로젝트에 대해 이야기해주세요...',
    'contact.submit': '메시지 보내기',
    'contact.submitAlert': '메시지가 전송되었습니다! (데모)',
    'contact.location': '위치',
    'contact.locationValue': '서울, 대한민국',

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

    // Hero
    'hero.greeting': 'Hello',
    'hero.intro': "I'm",
    'hero.introName': 'SeungHyun',
    'hero.introSuffix': '',
    'hero.description':
      'A developer who prioritizes user experience\nand creates value with clean code and modern technology.',
    'hero.aboutMe': 'About Me',
    'hero.contact': 'Contact',
    'hero.scroll': 'Scroll',

    // About
    'about.label': 'About Me',
    'about.title1': 'Building value through code,',
    'about.title2': 'Frontend Developer',
    'about.description1':
      'A frontend developer with 4 years of hands-on experience, starting from JavaScript · HTML · CSS and growing into React · TypeScript · Vite. Participated in enterprise-level projects for LG Electronics and KT DS, turning complex business requirements into clean, intuitive user experiences.',
    'about.description2':
      'I focus on code that lasts — not just code that works. From component architecture to state management and performance optimization, I build frontends that teams can confidently maintain and scale.',
    'about.description3':
      'I actively leverage AI as a creative partner to rapidly experiment with ideas and ship polished products independently. I focus on possibilities over limitations, always looking to build something new.',
    'about.status.company': 'ZettaSoft Inc. · Currently Employed',
    'about.status.career': '4 Years Frontend Experience',
    'about.status.location': 'Seoul, South Korea',
    'about.status.seeking': 'Open to new opportunities',
    'about.mainTech': 'Main Tech Stack',
    'about.libraries': 'Key Libraries',
    'about.highlight1.title': 'Enterprise Project Experience',
    'about.highlight1.desc': 'Delivered projects for LG Electronics, KT DS & more',
    'about.highlight2.title': 'UI Component Library',
    'about.highlight2.desc': 'Designed in-house component system for team productivity',
    'about.highlight3.title': 'AI-Powered Development',
    'about.highlight3.desc': 'Rapid prototyping and product delivery with AI collaboration',

    // Skills
    'skills.label': 'Skills',
    'skills.title1': 'Tech',
    'skills.title2': 'Stack',
    'skills.description': 'Skills acquired through continuous learning and practical experience',
    'skills.mainTech': 'Main Technologies',

    // Projects
    'projects.label': 'Portfolio',
    'projects.title1': 'Featured',
    'projects.title2': 'Projects',
    'projects.description': 'Projects implemented using various tech stacks',
    'projects.careerTab': 'Career Projects',
    'projects.personalTab': 'Personal Projects',
    'projects.vibeTab': 'Vibe Projects',
    'projects.filterAll': 'All',
    'projects.personalEmpty.title': 'Personal Projects Coming Soon',
    'projects.personalEmpty.desc': "I'll be adding my side projects and personal work here soon.",
    'projects.vibeDesc': 'Experimental projects built with AI vibe coding',

    // Experience
    'experience.label': 'Experience',
    'experience.title1': 'Career',
    'experience.title2': '& Education',
    'experience.description': 'My journey and growth as a developer',
    'experience.workTitle': 'Work Experience',
    'experience.eduTitle': 'Education',
    'experience.certTitle': 'Certifications',
    'experience.festivalTitle': 'Events & Festivals',
    'experience.work1.title': 'Frontend Developer',
    'experience.work1.org': 'ZettaSoft Inc.',
    'experience.work1.period': '2022.02 - Present',
    'experience.work1.desc1': 'Developed large-scale web applications using React and TypeScript',
    'experience.work1.desc2':
      'Participated in multiple projects for LG Electronics, KT DS, and others',
    'experience.work1.desc3': 'QlikSense BI tool customization and migration',
    'experience.work1.desc4': 'Designed and developed in-house standard UI component library',
    'experience.edu1.title': 'Dept. of Computer Information & Communications',
    'experience.edu1.org': 'Gukje University',
    'experience.edu1.period': '2015.03.02 - 2019.02.13',
    'experience.edu1.desc1': "Associate's degree in Computer Information & Communications",
    'experience.edu1.desc2': 'Studied networking, operating systems, and programming fundamentals',
    'experience.edu2.title': 'Dept. of ICT Convergence Engineering (Computer Science)',
    'experience.edu2.org': 'Anyang University',
    'experience.edu2.period': '2019.03.04 - 2021.02.19',
    'experience.edu2.desc1': "Bachelor's degree in Computer Science",
    'experience.edu2.desc2': 'Studied algorithms, data structures, and software engineering',
    'experience.edu2.desc3': 'Graduation project: AI-based recommendation system',
    'experience.festival1.name': 'AI FESTA 2025',
    'experience.festival1.org': 'AI FESTA',
    'experience.festival1.year': '2025',
    'experience.festival1.desc':
      'Explored latest AI trends and technologies, experienced various AI services',
    'experience.festival2.name': 'AI Conference 2026',
    'experience.festival2.org': 'AI Conference',
    'experience.festival2.year': '2026',
    'experience.festival2.desc': 'Participated in AI technology conference and networking',
    'experience.cert1.name': 'Engineer Information Processing',
    'experience.cert1.org': 'Human Resources Development Service of Korea',
    'experience.cert2.name': 'AWS Certified Developer',
    'experience.cert2.org': 'Amazon',

    // Contact
    'contact.label': 'Contact',
    'contact.title1': "Let's",
    'contact.title2': 'Work Together',
    'contact.description': 'Feel free to reach out for project collaboration or job opportunities',
    'contact.infoTitle': 'Contact Information',
    'contact.emailValue': 'seunghyun_1207@naver.com',
    'contact.followMe': 'Follow Me',
    'contact.formTitle': 'Send Message',
    'contact.nameLabel': 'Name',
    'contact.emailLabel': 'Email',
    'contact.messageLabel': 'Message',
    'contact.namePlaceholder': 'John Doe',
    'contact.messagePlaceholder': 'Tell me about your project...',
    'contact.submit': 'Send Message',
    'contact.submitAlert': 'Message sent! (Demo)',
    'contact.location': 'Location',
    'contact.locationValue': 'Seoul, South Korea',

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
