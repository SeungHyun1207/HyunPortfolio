import { useState } from 'react'
import { useScrollAnimation } from '@hooks'
import { useSettings } from '@/contexts/SettingsContext'

interface Project {
  id: string
  title: { ko: string; en: string }
  period: string
  startYear: number
  client: string
  role: { ko: string; en: string }
  highlights: { ko: string[]; en: string[] }
  techStack: string[]
  category: 'react' | 'java' | 'other'
}

type TabType = 'career' | 'personal'
type FilterType = 'all' | 'react' | 'java' | 'other'

const Projects = () => {
  const { t, language } = useSettings()
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 })
  const [activeTab, setActiveTab] = useState<TabType>('career')
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const projects: Project[] = [
    {
      id: '13',
      title: { ko: '의성 노지스마트팜 데이터 포털 구축', en: 'Uiseong Smart Farm Data Portal' },
      period: '2025.09 ~ 2025.12',
      startYear: 2025,
      client: '의성군 농업기술센터',
      role: { ko: '프론트엔드 개발 및 퍼블리싱', en: 'Frontend Dev & Publishing' },
      highlights: {
        ko: ['농업 센서 데이터 실시간 시각화 대시보드 구현', '현장 태블릿 환경을 고려한 반응형 UI 설계', 'React 컴포넌트 구조화로 유지보수성 확보'],
        en: ['Real-time agricultural sensor data visualization dashboard', 'Responsive UI optimized for on-site tablet environments', 'Component-based architecture for maintainability'],
      },
      techStack: ['React', 'TypeScript'],
      category: 'react',
    },
    {
      id: '12',
      title: { ko: '인재마스터 포털 구축', en: 'TalentMaster Portal' },
      period: '2025.04 ~ 2025.09',
      startYear: 2025,
      client: 'KT DS',
      role: { ko: 'LLM 프론트엔드 개발 및 퍼블리싱', en: 'LLM Frontend Dev & Publishing' },
      highlights: {
        ko: ['LLM 스트리밍 응답 처리 및 채팅 UI 구현', '복잡한 인재 데이터 테이블·검색·필터 UI 개발', 'TypeScript로 LLM API 타입 안전성 확보'],
        en: ['LLM streaming response handling and chat UI', 'Complex talent data table, search, and filter UI', 'Type-safe LLM API integration with TypeScript'],
      },
      techStack: ['React', 'TypeScript'],
      category: 'react',
    },
    {
      id: '11',
      title: { ko: 'DX과제관리 시스템 고도화', en: 'DX Task Management System Enhancement' },
      period: '2025.01 ~ 2025.03',
      startYear: 2025,
      client: 'LG전자',
      role: { ko: '프론트엔드 개발 및 퍼블리싱', en: 'Frontend Dev & Publishing' },
      highlights: {
        ko: ['기존 컴포넌트 리팩토링 및 렌더링 성능 최적화', '사용자 피드백 기반 UX 개선 및 접근성 향상', '레거시 코드 TypeScript 마이그레이션'],
        en: ['Component refactoring and rendering performance optimization', 'UX improvement based on user feedback', 'Legacy code migration to TypeScript'],
      },
      techStack: ['React', 'TypeScript'],
      category: 'react',
    },
    {
      id: '10',
      title: { ko: 'DX과제관리 포털 (1차·2차)', en: 'DX Task Management Portal (Phase 1 & 2)' },
      period: '2024.04 ~ 2024.12',
      startYear: 2024,
      client: 'LG전자',
      role: { ko: '프론트엔드 개발 및 퍼블리싱', en: 'Frontend Dev & Publishing' },
      highlights: {
        ko: ['대규모 과제 데이터 테이블·필터링·정렬 UI 구현', '단계별 프로세스 관리 대시보드 및 차트 개발', '1차 완료 후 2차 기능 확장·고도화 연속 참여'],
        en: ['Large-scale task data table, filtering and sorting UI', 'Process management dashboard and chart development', 'Continuous involvement from Phase 1 through Phase 2 expansion'],
      },
      techStack: ['React', 'TypeScript'],
      category: 'react',
    },
    {
      id: '9',
      title: { ko: '지표관리시스템', en: 'KPI Management System' },
      period: '2024.01 ~ 2024.04',
      startYear: 2024,
      client: 'LG전자 한영본부',
      role: { ko: '프론트엔드 개발 및 퍼블리싱', en: 'Frontend Dev & Publishing' },
      highlights: {
        ko: ['KPI 지표 차트·그래프 시각화 컴포넌트 개발', '한·영 다국어 전환 지원 인터페이스 구현', '구축 완료 후 유지보수까지 연속 담당'],
        en: ['KPI indicator chart and graph visualization components', 'Korean/English multi-language interface', 'Continuous ownership from development to maintenance'],
      },
      techStack: ['React', 'TypeScript'],
      category: 'react',
    },
    {
      id: '7',
      title: { ko: '농협중앙회 빅데이터 플랫폼 포털 고도화', en: 'NH Co-op Big Data Portal Enhancement' },
      period: '2023.06 ~ 2023.11',
      startYear: 2023,
      client: '농협중앙회',
      role: { ko: '개발', en: 'Development' },
      highlights: {
        ko: ['빅데이터 조회·분석 화면 기능 고도화', '레거시 JSP 시스템 신규 기능 추가 및 버그 수정', '대용량 데이터 페이지네이션 및 검색 UI 개선'],
        en: ['Big data query and analysis screen enhancement', 'Legacy JSP system new feature addition and bug fixes', 'Large dataset pagination and search UI improvement'],
      },
      techStack: ['Java', 'JSP', 'jQuery'],
      category: 'java',
    },
    {
      id: '6',
      title: { ko: 'ZettaFrame (사내 프레임워크)', en: 'ZettaFrame (In-house Framework)' },
      period: '2022.12 ~ 2023.03',
      startYear: 2022,
      client: '(주)제타소프트',
      role: { ko: '개발', en: 'Development' },
      highlights: {
        ko: ['사내 표준 재사용 UI 컴포넌트 라이브러리 설계·개발', '공통 모듈 구조화로 개발 생산성 향상 기여', '내부 개발팀 온보딩을 위한 컴포넌트 문서화'],
        en: ['In-house standard reusable UI component library', 'Common module structure for improved dev productivity', 'Component documentation for internal team onboarding'],
      },
      techStack: ['Java', 'JSP'],
      category: 'other',
    },
    {
      id: '5',
      title: { ko: '메트라이프 QlikSense 업그레이드', en: 'MetLife QlikSense Upgrade & Migration' },
      period: '2022.09 ~ 2022.10',
      startYear: 2022,
      client: '메트라이프생명',
      role: { ko: '업그레이드', en: 'Upgrade' },
      highlights: {
        ko: ['분석 시스템 QlikSense 구버전 → 신버전 마이그레이션', '기존 대시보드 레이아웃 호환성 검증 및 유지', '업그레이드 후 QA 및 인수 테스트 지원'],
        en: ['QlikSense legacy to latest version migration', 'Existing dashboard compatibility verification', 'Post-upgrade QA and acceptance testing support'],
      },
      techStack: ['QlikSense', 'QlikView'],
      category: 'other',
    },
    {
      id: '4',
      title: { ko: '롯데물산 F&B 스마트 테이블링 서비스', en: 'Lotte Asset F&B Smart Tabling' },
      period: '2022.08',
      startYear: 2022,
      client: '롯데물산',
      role: { ko: '개발', en: 'Development' },
      highlights: {
        ko: ['QlikSense 커스텀 로그인 페이지 개발', 'SSO(Single Sign-On) 연동으로 통합 인증 구현', '기업 보안 정책에 부합하는 인증 흐름 설계'],
        en: ['Custom QlikSense login page development', 'SSO integration for unified authentication', 'Authentication flow aligned with enterprise security policy'],
      },
      techStack: ['Java', 'JSP', 'QlikSense'],
      category: 'java',
    },
    {
      id: '3',
      title: { ko: 'LX판토스 관리자 커뮤니티', en: 'LX Pantos Admin Community' },
      period: '2022.06 ~ 2022.07',
      startYear: 2022,
      client: 'LX판토스',
      role: { ko: '개발', en: 'Development' },
      highlights: {
        ko: ['관리자 전용 게시판·공지 CRUD 시스템 개발', '역할 기반 접근 제어(RBAC) UI 구현', '파일 첨부·다운로드 기능 개발'],
        en: ['Admin-only bulletin board and notice CRUD system', 'Role-based access control (RBAC) UI', 'File attachment and download functionality'],
      },
      techStack: ['Java', 'JSP', 'jQuery'],
      category: 'java',
    },
    {
      id: '1',
      title: { ko: 'BNK부산은행 연관분석 시각화', en: 'BNK Busan Bank Correlation Visualization' },
      period: '2022.04 ~ 2022.06',
      startYear: 2022,
      client: 'BNK시스템',
      role: { ko: '개발 및 문서작업', en: 'Development & Documentation' },
      highlights: {
        ko: ['GoJS 라이브러리로 선후행관계 노드-엣지 그래프 구현', '복잡한 연관분석 데이터를 인터랙티브 다이어그램으로 시각화', '시스템 분석 문서 및 기술 명세 작성'],
        en: ['Node-edge precedence relationship graph using GoJS', 'Complex correlation data visualized as interactive diagram', 'System analysis documentation and technical spec writing'],
      },
      techStack: ['Java', 'JSP', 'GoJS'],
      category: 'java',
    },
  ]

  const filters: { label: { ko: string; en: string }; value: FilterType }[] = [
    { label: { ko: '전체', en: 'All' }, value: 'all' },
    { label: { ko: 'React', en: 'React' }, value: 'react' },
    { label: { ko: 'Java', en: 'Java' }, value: 'java' },
    { label: { ko: '기타', en: 'Other' }, value: 'other' },
  ]

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  const getCategoryIcon = (category: Project['category']) => {
    if (category === 'react') return '⚛️'
    if (category === 'java') return '☕'
    return '🔧'
  }

  const yearGroups = [
    { year: 2025, emoji: '🚀', items: projects.filter((p) => p.startYear === 2025) },
    { year: 2024, emoji: '⚡', items: projects.filter((p) => p.startYear === 2024) },
    { year: 2023, emoji: '🌱', items: projects.filter((p) => p.startYear === 2023) },
    { year: 2022, emoji: '🔰', items: projects.filter((p) => p.startYear === 2022) },
  ]

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 md:py-32 bg-[#f8f9fa] dark:bg-[#12121a]"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* ── 섹션 헤더 ── */}
        <div
          className="text-center mb-10 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {t('projects.label')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            {t('projects.title1')}{' '}
            <span className="gradient-text">{t('projects.title2')}</span>
          </h2>
          <p className="text-[#4a4a5a] dark:text-[#a0a0b0] max-w-2xl mx-auto">
            {t('projects.description')}
          </p>
        </div>

        {/* ── 탭 네비게이션 ── */}
        <div
          className="flex justify-center mb-10 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: '50ms',
          }}
        >
          <div className="flex gap-1 p-1 rounded-xl bg-white dark:bg-[#0a0a0f] border border-black/[0.08] dark:border-white/[0.08]">
            {(['career', 'personal'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'text-white shadow-sm'
                    : 'text-[#4a4a5a] dark:text-[#a0a0b0] hover:text-[#1a1a2e] dark:hover:text-white'
                }`}
                style={activeTab === tab ? { background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' } : {}}
              >
                {tab === 'career' ? t('projects.careerTab') : t('projects.personalTab')}
              </button>
            ))}
          </div>
        </div>

        {/* ══════════════ 경력 프로젝트 탭 ══════════════ */}
        {activeTab === 'career' && (
          <>
            {/* 야간 3D 타임라인 */}
            <div
              className="relative rounded-2xl overflow-hidden mb-12 transition-all duration-700"
              style={{
                background: 'linear-gradient(160deg, #05050f 0%, #0a0a1e 40%, #080818 100%)',
                padding: '2rem',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                transitionDelay: '100ms',
              }}
            >
              {/* 배경 오버레이 */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(ellipse at 15% 20%, rgba(99,102,241,0.13) 0%, transparent 55%),
                    radial-gradient(ellipse at 85% 75%, rgba(168,85,247,0.11) 0%, transparent 55%)
                  `,
                }}
              />

              {/* 타임라인 헤더 */}
              <div className="text-center mb-8 relative z-10">
                <p className="text-[0.7rem] font-bold tracking-[0.3em] text-indigo-400/80 uppercase mb-1">
                  Career Journey
                </p>
                <h3 className="text-xl font-bold text-white mb-1">
                  {language === 'ko' ? '2022 → 현재까지의 여정' : '2022 → Present Journey'}
                </h3>
                <span className="text-xs text-white/30">
                  {language === 'ko'
                    ? `총 ${projects.length}개 프로젝트 · 3년+`
                    : `${projects.length} projects · 3+ years`}
                </span>
              </div>

              {/* 연도별 그룹 */}
              {yearGroups.map((group, groupIdx) => (
                <div key={group.year} className={`relative z-10 ${groupIdx > 0 ? 'mt-8' : ''}`}>
                  {/* 연도 헤더 */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="px-4 py-1.5 rounded-lg flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.28) 0%, rgba(168,85,247,0.28) 100%)',
                        border: '1px solid rgba(99,102,241,0.45)',
                        boxShadow: '0 0 16px rgba(99,102,241,0.2)',
                      }}
                    >
                      <span className="font-extrabold text-white tracking-wide">
                        {group.emoji} {group.year}
                      </span>
                    </div>
                    <div
                      className="flex-1 h-px"
                      style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.5), transparent)' }}
                    />
                    <span className="text-xs text-white/25 flex-shrink-0">
                      {group.items.length}{language === 'ko' ? '개' : ' proj'}
                    </span>
                  </div>

                  {/* 항목 */}
                  <div className="pl-4 md:pl-7 relative">
                    {/* 세로 라인 */}
                    <div
                      className="timeline-line absolute left-[7px] md:left-[13px] top-2.5 bottom-2.5 w-0.5 rounded-sm"
                    />

                    {group.items.map((project, itemIdx) => (
                      <div
                        key={project.id}
                        className={`flex items-start gap-4 md:gap-6 relative ${itemIdx < group.items.length - 1 ? 'mb-5' : ''}`}
                      >
                        {/* 닷 */}
                        <div
                          className="timeline-dot w-3 h-3 rounded-full flex-shrink-0 mt-4 ml-0 md:ml-1.5 z-10"
                          style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                        />

                        {/* 3D 카드 */}
                        <div
                          className="flex-1 p-4 md:p-5 rounded-xl transition-all duration-300"
                          style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(99,102,241,0.18)',
                            backdropFilter: 'blur(10px)',
                            transformOrigin: 'left center',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(99,102,241,0.08)'
                            e.currentTarget.style.border = '1px solid rgba(99,102,241,0.45)'
                            e.currentTarget.style.boxShadow = '0 8px 40px rgba(99,102,241,0.18), inset 0 1px 0 rgba(255,255,255,0.06)'
                            e.currentTarget.style.transform = 'perspective(800px) rotateY(-3deg) translateX(6px) translateY(-2px)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                            e.currentTarget.style.border = '1px solid rgba(99,102,241,0.18)'
                            e.currentTarget.style.boxShadow = ''
                            e.currentTarget.style.transform = ''
                          }}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <span
                                className="text-xs font-semibold block mb-0.5"
                                style={{ color: 'rgba(99,102,241,0.85)' }}
                              >
                                {project.client}
                              </span>
                              <span className="text-sm font-bold text-white leading-snug">
                                {project.title[language]}
                              </span>
                            </div>
                            <div
                              className="flex-shrink-0 px-2 py-0.5 rounded"
                              style={{ border: '1px solid rgba(168,85,247,0.3)' }}
                            >
                              <span
                                className="text-[0.58rem] font-semibold whitespace-nowrap"
                                style={{ color: 'rgba(168,85,247,0.8)' }}
                              >
                                {project.period}
                              </span>
                            </div>
                          </div>

                          {/* 핵심 포인트 */}
                          <div className="flex flex-col gap-1 mb-3">
                            {project.highlights[language].slice(0, 2).map((point, i) => (
                              <div key={i} className="flex items-start gap-1.5">
                                <span className="text-[0.58rem] mt-[5px] flex-shrink-0" style={{ color: '#6366f1' }}>▹</span>
                                <span className="text-[0.71rem] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                  {point}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* 기술 스택 */}
                          <div className="flex flex-wrap gap-1">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="text-[0.6rem] font-semibold px-2 py-0.5 rounded"
                                style={{
                                  color: 'rgba(168,85,247,0.85)',
                                  background: 'rgba(168,85,247,0.1)',
                                  border: '1px solid rgba(168,85,247,0.2)',
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* 하단 라이브 인디케이터 */}
              <div className="text-center mt-8 relative z-10">
                <div
                  className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full"
                  style={{
                    background: 'rgba(99,102,241,0.1)',
                    border: '1px solid rgba(99,102,241,0.3)',
                    boxShadow: '0 0 24px rgba(99,102,241,0.12)',
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-green-400"
                    style={{ boxShadow: '0 0 8px rgba(74,222,128,0.8)' }}
                  />
                  <span className="text-[0.78rem] font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {language === 'ko' ? '현재 진행 중 · 성장 계속' : 'Currently Active · Still Growing'}
                  </span>
                </div>
              </div>
            </div>

            {/* 프로젝트 상세 소제목 */}
            <div
              className="text-center mb-6 transition-all duration-700"
              style={{ opacity: isVisible ? 1 : 0, transitionDelay: '200ms' }}
            >
              <h3 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-1">
                {language === 'ko' ? '프로젝트 상세' : 'Project Details'}
              </h3>
              <p className="text-sm text-[#4a4a5a] dark:text-[#a0a0b0]">
                {language === 'ko' ? '각 프로젝트의 목표와 기여 내용을 확인하세요' : 'Explore goals and contributions of each project'}
              </p>
            </div>

            {/* 필터 */}
            <div
              className="flex justify-center gap-2 mb-8 flex-wrap transition-all duration-700"
              style={{ opacity: isVisible ? 1 : 0, transitionDelay: '250ms' }}
            >
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                    activeFilter === filter.value
                      ? 'text-white border-transparent'
                      : 'text-[#4a4a5a] dark:text-[#a0a0b0] border-black/[0.08] dark:border-white/[0.08] hover:border-primary hover:text-[#1a1a2e] dark:hover:text-white'
                  }`}
                  style={activeFilter === filter.value
                    ? { background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }
                    : {}
                  }
                >
                  {filter.label[language]}
                </button>
              ))}
            </div>

            {/* 카드 그리드 */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '300ms',
              }}
            >
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="rounded-2xl overflow-hidden bg-white dark:bg-[#0a0a0f] border border-black/[0.08] dark:border-white/[0.08] hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(99,102,241,0.1)] transition-all duration-300 flex flex-col"
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  {/* 카드 상단 바 */}
                  <div className="py-4 px-5 bg-primary/[0.04] flex items-center justify-between border-b border-black/[0.08] dark:border-white/[0.08]">
                    <span className="text-2xl">{getCategoryIcon(project.category)}</span>
                    <span className="text-[0.65rem] font-semibold text-primary px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/25">
                      {project.period}
                    </span>
                  </div>

                  {/* 카드 본문 */}
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-xs font-semibold text-primary mb-1.5 tracking-wide">
                      {project.client}
                    </p>
                    <h4 className="font-bold text-[#1a1a2e] dark:text-white mb-4 leading-snug">
                      {project.title[language]}
                    </h4>

                    <div className="flex flex-col gap-2 mb-4">
                      {project.highlights[language].map((point, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0 opacity-80" />
                          <span className="text-xs text-[#4a4a5a] dark:text-[#a0a0b0] leading-relaxed">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-[#4a4a5a] dark:text-[#a0a0b0] mb-4">
                      {language === 'ko' ? '담당: ' : 'Role: '}
                      <span className="text-[#1a1a2e] dark:text-white font-medium">{project.role[language]}</span>
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded-md bg-[#f8f9fa] dark:bg-[#12121a] border border-black/[0.08] dark:border-white/[0.08] text-[#4a4a5a] dark:text-[#a0a0b0]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ══════════════ 개인 프로젝트 탭 ══════════════ */}
        {activeTab === 'personal' && (
          <div
            className="transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
              transitionDelay: '100ms',
            }}
          >
            {/* 빈 상태 */}
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.15) 100%)' }}
              >
                <span className="text-4xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-3">
                {t('projects.personalEmpty.title')}
              </h3>
              <p className="text-[#4a4a5a] dark:text-[#a0a0b0] max-w-md leading-relaxed">
                {t('projects.personalEmpty.desc')}
              </p>
              {/* 장식 점선 테두리 */}
              <div className="mt-10 w-full max-w-sm h-40 rounded-2xl border-2 border-dashed border-black/[0.08] dark:border-white/[0.08] flex items-center justify-center">
                <span className="text-xs text-[#4a4a5a]/50 dark:text-[#a0a0b0]/50 tracking-widest uppercase">
                  {language === 'ko' ? '곧 추가 예정' : 'Coming Soon'}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}

export default Projects
