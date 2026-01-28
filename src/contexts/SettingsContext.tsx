import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'dark' | 'light'
type Language = 'ko' | 'en'

interface SettingsContextType {
  theme: Theme
  language: Language
  setTheme: (theme: Theme) => void
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const SettingsContext = createContext<SettingsContextType | null>(null)

/**
 * 설정 Provider
 * 테마와 언어 설정을 전역으로 관리
 */
export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'dark'
    }
    return 'dark'
  })

  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'ko'
    }
    return 'ko'
  })

  // 테마 변경
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  // 언어 변경
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  // 테마 적용
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
      root.classList.remove('light')
    }
  }, [theme])

  // 번역 함수
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <SettingsContext.Provider value={{ theme, language, setTheme, setLanguage, t }}>
      {children}
    </SettingsContext.Provider>
  )
}

/**
 * 설정 Hook
 */
export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

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
    'hero.description': '사용자 경험을 최우선으로 생각하며,\n클린 코드와 모던 기술로 가치를 만드는 개발자입니다.',
    'hero.aboutMe': '소개 보기',
    'hero.contact': '연락하기',
    'hero.scroll': '스크롤',

    // About
    'about.label': '소개',
    'about.title1': '열정을 코드로 표현하는',
    'about.title2': '프론트엔드 개발자',
    'about.description1': '안녕하세요! 저는 사용자 중심의 웹 경험을 만드는 것에 열정을 가진 프론트엔드 개발자입니다. React, TypeScript를 주력으로 사용하며, 항상 최신 기술 트렌드를 학습하고 적용합니다.',
    'about.description2': '클린 코드와 최적화된 성능, 그리고 직관적인 UI/UX를 통해 사용자와 비즈니스 모두에게 가치를 전달하는 것이 제 목표입니다.',
    'about.yearsExp': '경력',
    'about.projects': '프로젝트',
    'about.clients': '고객사',
    'about.cleanArchitecture': '클린 아키텍처',
    'about.cleanArchitectureDesc': '유지보수성과 확장성을 고려한 설계',
    'about.performanceFirst': '성능 최우선',
    'about.performanceFirstDesc': '최적화된 렌더링과 빠른 로딩 속도',
    'about.responsiveDesign': '반응형 디자인',
    'about.responsiveDesignDesc': '모든 디바이스에서 완벽한 경험',

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
    'projects.filterAll': '전체',
    'projects.filterWeb': '웹',
    'projects.filterMobile': '모바일',
    'projects.filterOther': '기타',
    'projects.ecommerce.title': 'E-Commerce 플랫폼',
    'projects.ecommerce.desc': '현대적인 UI/UX를 갖춘 풀스택 이커머스 플랫폼. 결제 시스템, 장바구니, 주문 관리 기능을 포함합니다.',
    'projects.taskManagement.title': '태스크 관리 앱',
    'projects.taskManagement.desc': '팀 협업을 위한 태스크 관리 애플리케이션. 실시간 동기화와 드래그 앤 드롭 기능을 지원합니다.',
    'projects.weather.title': '날씨 대시보드',
    'projects.weather.desc': '날씨 정보를 시각적으로 보여주는 대시보드. 다양한 차트와 지도 기능을 포함합니다.',
    'projects.fitness.title': '피트니스 트래커',
    'projects.fitness.desc': '운동 기록과 건강 데이터를 추적하는 모바일 앱. 목표 설정과 진행 상황 시각화 기능을 제공합니다.',
    'projects.portfolio.title': '포트폴리오 생성기',
    'projects.portfolio.desc': '개발자를 위한 포트폴리오 자동 생성 도구. GitHub 데이터를 기반으로 포트폴리오를 생성합니다.',
    'projects.chat.title': '실시간 채팅 앱',
    'projects.chat.desc': '실시간 채팅 애플리케이션. 1:1 채팅, 그룹 채팅, 파일 공유 기능을 지원합니다.',

    // Experience
    'experience.label': '경력',
    'experience.title1': '경력',
    'experience.title2': '& 학력',
    'experience.description': '개발자로서 걸어온 길과 성장의 발자취입니다',
    'experience.workTitle': '경력 사항',
    'experience.eduTitle': '학력',
    'experience.certTitle': '자격증',
    'experience.work1.title': '프론트엔드 개발자',
    'experience.work1.org': 'Tech Company',
    'experience.work1.period': '2022.03 - 현재',
    'experience.work1.desc1': 'React, TypeScript를 활용한 대규모 웹 애플리케이션 개발',
    'experience.work1.desc2': '성능 최적화를 통해 페이지 로딩 속도 40% 개선',
    'experience.work1.desc3': 'CI/CD 파이프라인 구축 및 자동화 테스트 도입',
    'experience.work1.desc4': '주니어 개발자 멘토링 및 코드 리뷰 진행',
    'experience.work2.title': '웹 개발자',
    'experience.work2.org': 'Startup Inc.',
    'experience.work2.period': '2020.06 - 2022.02',
    'experience.work2.desc1': '스타트업 초기 멤버로 서비스 런칭 참여',
    'experience.work2.desc2': '반응형 웹 디자인 및 크로스 브라우저 호환성 구현',
    'experience.work2.desc3': 'RESTful API 연동 및 상태 관리 설계',
    'experience.work2.desc4': '애자일 방법론 기반의 스프린트 개발 진행',
    'experience.edu1.title': '컴퓨터공학과',
    'experience.edu1.org': '서울대학교',
    'experience.edu1.period': '2016.03 - 2020.02',
    'experience.edu1.desc1': '컴퓨터 과학 전공 학사 학위 취득',
    'experience.edu1.desc2': '알고리즘, 자료구조, 소프트웨어 공학 수강',
    'experience.edu1.desc3': '졸업 프로젝트: AI 기반 추천 시스템 개발',
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
    'hero.description': 'A developer who prioritizes user experience\nand creates value with clean code and modern technology.',
    'hero.aboutMe': 'About Me',
    'hero.contact': 'Contact',
    'hero.scroll': 'Scroll',

    // About
    'about.label': 'About Me',
    'about.title1': 'Expressing passion through code',
    'about.title2': 'Frontend Developer',
    'about.description1': 'Hello! I am a frontend developer passionate about creating user-centered web experiences. I primarily work with React and TypeScript, always learning and applying the latest technology trends.',
    'about.description2': 'My goal is to deliver value to both users and businesses through clean code, optimized performance, and intuitive UI/UX.',
    'about.yearsExp': 'Years Exp',
    'about.projects': 'Projects',
    'about.clients': 'Clients',
    'about.cleanArchitecture': 'Clean Architecture',
    'about.cleanArchitectureDesc': 'Design considering maintainability and scalability',
    'about.performanceFirst': 'Performance First',
    'about.performanceFirstDesc': 'Optimized rendering and fast loading speed',
    'about.responsiveDesign': 'Responsive Design',
    'about.responsiveDesignDesc': 'Perfect experience on all devices',

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
    'projects.filterAll': 'All',
    'projects.filterWeb': 'Web',
    'projects.filterMobile': 'Mobile',
    'projects.filterOther': 'Other',
    'projects.ecommerce.title': 'E-Commerce Platform',
    'projects.ecommerce.desc': 'Full-stack e-commerce platform with modern UI/UX. Includes payment system, shopping cart, and order management.',
    'projects.taskManagement.title': 'Task Management App',
    'projects.taskManagement.desc': 'Task management application for team collaboration. Supports real-time sync and drag & drop.',
    'projects.weather.title': 'Weather Dashboard',
    'projects.weather.desc': 'Dashboard that visually displays weather information. Includes various charts and map features.',
    'projects.fitness.title': 'Fitness Tracker',
    'projects.fitness.desc': 'Mobile app for tracking exercise and health data. Provides goal setting and progress visualization.',
    'projects.portfolio.title': 'Portfolio Generator',
    'projects.portfolio.desc': 'Auto portfolio generator for developers. Creates portfolios based on GitHub data.',
    'projects.chat.title': 'Real-time Chat App',
    'projects.chat.desc': 'Real-time chat application. Supports 1:1 chat, group chat, and file sharing.',

    // Experience
    'experience.label': 'Experience',
    'experience.title1': 'Career',
    'experience.title2': '& Education',
    'experience.description': 'My journey and growth as a developer',
    'experience.workTitle': 'Work Experience',
    'experience.eduTitle': 'Education',
    'experience.certTitle': 'Certifications',
    'experience.work1.title': 'Frontend Developer',
    'experience.work1.org': 'Tech Company',
    'experience.work1.period': '2022.03 - Present',
    'experience.work1.desc1': 'Developed large-scale web applications using React and TypeScript',
    'experience.work1.desc2': 'Improved page loading speed by 40% through performance optimization',
    'experience.work1.desc3': 'Built CI/CD pipeline and introduced automated testing',
    'experience.work1.desc4': 'Mentored junior developers and conducted code reviews',
    'experience.work2.title': 'Web Developer',
    'experience.work2.org': 'Startup Inc.',
    'experience.work2.period': '2020.06 - 2022.02',
    'experience.work2.desc1': 'Participated in service launch as early startup member',
    'experience.work2.desc2': 'Implemented responsive web design and cross-browser compatibility',
    'experience.work2.desc3': 'Designed RESTful API integration and state management',
    'experience.work2.desc4': 'Conducted agile methodology-based sprint development',
    'experience.edu1.title': 'Computer Science',
    'experience.edu1.org': 'Seoul National University',
    'experience.edu1.period': '2016.03 - 2020.02',
    'experience.edu1.desc1': "Bachelor's degree in Computer Science",
    'experience.edu1.desc2': 'Studied algorithms, data structures, and software engineering',
    'experience.edu1.desc3': 'Graduation project: AI-based recommendation system',
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
}

export default SettingsContext
