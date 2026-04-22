import { useScrollAnimation } from '@hooks';
import { usePageTranslation } from '@hooks/usePageTranslation';
import type {
  FilterType,
  PersonalProject,
  Project,
  TabType,
  VibeProject,
} from '@models/home/projects/ProjectsModel';
import { Box, Button, Chip, Paper, Tab, Tabs, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { translations } from './CareerProjects.i18n';

const PERSONAL_PROJECTS: PersonalProject[] = [
  {
    id: 'intranet',
    title: { ko: '사내관리시스템', en: 'In-house Management System' },
    description: {
      ko: '직원 및 관리자가 사용하는 사내 통합 관리 시스템. KPI 지표 시각화, 부서별 현황 차트, 공지 관리, 일정 캘린더를 통합 제공합니다.',
      en: 'An integrated in-house management system for employees and admins. Includes KPI visualization, department charts, notice management, and a schedule calendar.',
    },
    techStack: ['React', 'TypeScript', 'MUI', 'Recharts'],
    icon: '🏢',
    badge: 'Management',
    accentColor: '#6366f1',
    status: 'in-progress',
    path: '/personalProject/intranet',
  },
];

const VIBE_PROJECTS: VibeProject[] = [
  {
    id: 'dashboard',
    title: { ko: '포트폴리오 Analytics', en: 'Portfolio Analytics' },
    description: {
      ko: 'localStorage 기반 포트폴리오 방문 추적 대시보드. 실제 방문 데이터를 7일간 보관하며, 누적/오늘 방문수, 일별 추이, 섹션별 조회, 유입 경로를 SVG 차트로 시각화합니다.',
      en: 'localStorage-based portfolio visit tracking dashboard. Stores real visit data for 7 days, visualizing total/today visits, daily trends, section views, and traffic sources with SVG charts.',
    },
    techStack: ['React', 'TypeScript', 'SVG'],
    path: '/vibeProject/dashboard',
    accentColor: '#f59e0b',
    badge: 'Analytics',
    icon: '📊',
  },
  {
    id: 'aiagent',
    title: { ko: 'AI Agent 대시보드', en: 'AI Agent Dashboard' },
    description: {
      ko: 'LLM 기반 멀티 채팅방 어드민 대시보드. GPT-4o / Claude / Gemini / Llama 모델 전환, 스트리밍 응답 시뮬레이션, 피드백 기능을 구현했습니다.',
      en: 'LLM-based multi-room admin chat dashboard. Supports GPT-4o / Claude / Gemini / Llama model switching, streaming simulation, and message feedback.',
    },
    techStack: ['React', 'TypeScript', 'chat-ui-kit'],
    path: '/vibeProject/aiagent',
    accentColor: '#00c8ff',
    badge: 'AI / Chat',
    icon: '🤖',
  },
  {
    id: 'githeatmap',
    title: { ko: 'GitHub Heatmap', en: 'GitHub Heatmap' },
    description: {
      ko: '연간 GitHub 기여도를 히트맵으로 시각화합니다. 총 커밋 수, 최장 스트릭, 요일·월별 피크 통계를 한눈에 확인할 수 있습니다.',
      en: 'Visualizes annual GitHub contributions as a heatmap. Displays total commits, longest streak, and peak day/month stats.',
    },
    techStack: ['React', 'TypeScript', 'SVG'],
    path: '/vibeProject/githeatmap',
    accentColor: '#39d353',
    badge: 'Data Viz',
    icon: '🗓️',
  },
  {
    id: 'snippet',
    title: { ko: 'Code Snippet Manager', en: 'Code Snippet Manager' },
    description: {
      ko: 'LocalStorage 기반 코드 스니펫 저장·관리 도구. 언어별 필터, 태그 검색, 클립보드 복사, CRUD 기능을 지원합니다.',
      en: 'LocalStorage-powered snippet manager. Supports language filtering, tag search, clipboard copy, and full CRUD.',
    },
    techStack: ['React', 'TypeScript', 'LocalStorage'],
    path: '/vibeProject/snippet',
    accentColor: '#f43f5e',
    badge: 'Productivity',
    icon: '</>',
  },
];

const CareerProjects = () => {
  const { t, language } = usePageTranslation(translations);
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState<TabType>('career');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const projects: Project[] = [
    {
      id: '16',
      title: { ko: '제타소프트 홈페이지 리뉴얼', en: 'ZettaSoft Homepage Renewal' },
      period: '2026.01 ~ 2026.03',
      startYear: 2026,
      client: '(주)제타소프트',
      role: { ko: '프론트엔드 리팩토링 및 스타일링 전환', en: 'Frontend Refactoring & Styling Migration' },
      highlights: {
        ko: [
          '기존 CSS 방식에서 MUI 스타일링 방식으로 전면 전환',
          'Claude Code 기반 AI 보조 워크플로우로 리팩토링 효율 향상',
          'Google API 연동 코드 리팩토링 및 Tailwind CSS 프레임워크 적용 테스트',
        ],
        en: [
          'Migrated from legacy CSS to MUI styling across the codebase',
          'Leveraged Claude Code AI workflow to accelerate refactoring',
          'Refactored Google API integration and prototyped Tailwind CSS adoption',
        ],
      },
      techStack: ['React', 'TypeScript', 'MUI', 'Tailwind CSS'],
      category: 'react',
    },
    {
      id: '15',
      title: { ko: '제타소프트 홈페이지 콘텐츠 자동화 시스템', en: 'ZettaSoft Homepage Content Automation' },
      period: '2026.01 ~ 진행중',
      startYear: 2026,
      client: '(주)제타소프트',
      role: { ko: '사내 도구 설계 및 개발', en: 'Internal Tool Design & Development' },
      highlights: {
        ko: [
          '비개발자가 콘텐츠를 수정할 수 있는 엑셀 템플릿 설계',
          '구글 스프레드시트 기반 로컬 프로젝트 텍스트 변경 파이프라인 구축',
          '홈페이지 구조 명세서 작성으로 유지보수 프로세스 표준화',
        ],
        en: [
          'Designed Excel template enabling non-developers to edit content',
          'Built Google Sheets pipeline for automated text updates',
          'Standardized maintenance via structured page specifications',
        ],
      },
      techStack: ['Excel', 'Google Sheets API', 'Automation'],
      category: 'other',
    },
    {
      id: '14',
      title: { ko: 'Figma MCP + Claude 디자인-개발 연계 워크플로우 구축', en: 'Figma MCP + Claude Dev Workflow' },
      period: '2026.01',
      startYear: 2026,
      client: '사내 R&D',
      role: { ko: 'MCP 기반 자동화 워크플로우 PoC', en: 'MCP-based Automation Workflow PoC' },
      highlights: {
        ko: [
          'VSCode + Figma Personal Access Token 기반 API 연동 환경 구축',
          'figma:discover / sync 명령으로 디자인→React 컴포넌트 자동 생성 검증',
          'Model Context Protocol 실무 활용 및 디자인 변경→코드 반영 프로세스 정립',
        ],
        en: [
          'Set up VSCode + Figma API integration via Personal Access Token',
          'Validated design-to-React component auto-generation with figma:discover/sync',
          'Established MCP-based design-to-code workflow for production use',
        ],
      },
      techStack: ['Figma MCP', 'Claude Code', 'React', 'TypeScript'],
      category: 'react',
    },
    {
      id: '13',
      title: { ko: '의성 노지스마트팜 데이터 포털 구축', en: 'Uiseong Smart Farm Data Portal' },
      period: '2025.09 ~ 2025.12',
      startYear: 2025,
      client: '의성군 농업기술센터',
      role: { ko: '프론트엔드 개발 및 퍼블리싱', en: 'Frontend Dev & Publishing' },
      highlights: {
        ko: [
          '농업 센서 데이터 실시간 시각화 대시보드 구현',
          '현장 태블릿 환경을 고려한 반응형 UI 설계',
          'React 컴포넌트 구조화로 유지보수성 확보',
        ],
        en: [
          'Real-time agricultural sensor data visualization dashboard',
          'Responsive UI optimized for on-site tablet environments',
          'Component-based architecture for maintainability',
        ],
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
        ko: [
          'LLM 스트리밍 응답 처리 및 채팅 UI 구현',
          '복잡한 인재 데이터 테이블·검색·필터 UI 개발',
          'TypeScript로 LLM API 타입 안전성 확보',
        ],
        en: [
          'LLM streaming response handling and chat UI',
          'Complex talent data table, search, and filter UI',
          'Type-safe LLM API integration with TypeScript',
        ],
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
        ko: [
          '기존 컴포넌트 리팩토링 및 렌더링 성능 최적화',
          '사용자 피드백 기반 UX 개선 및 접근성 향상',
          '레거시 코드 TypeScript 마이그레이션',
        ],
        en: [
          'Component refactoring and rendering performance optimization',
          'UX improvement based on user feedback',
          'Legacy code migration to TypeScript',
        ],
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
        ko: [
          '대규모 과제 데이터 테이블·필터링·정렬 UI 구현',
          '단계별 프로세스 관리 대시보드 및 차트 개발',
          '1차 완료 후 2차 기능 확장·고도화 연속 참여',
        ],
        en: [
          'Large-scale task data table, filtering and sorting UI',
          'Process management dashboard and chart development',
          'Continuous involvement from Phase 1 through Phase 2 expansion',
        ],
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
        ko: [
          'KPI 지표 차트·그래프 시각화 컴포넌트 개발',
          '한·영 다국어 전환 지원 인터페이스 구현',
          '구축 완료 후 유지보수까지 연속 담당',
        ],
        en: [
          'KPI indicator chart and graph visualization components',
          'Korean/English multi-language interface',
          'Continuous ownership from development to maintenance',
        ],
      },
      techStack: ['React', 'TypeScript'],
      category: 'react',
    },
    {
      id: '7',
      title: {
        ko: '농협중앙회 빅데이터 플랫폼 포털 고도화',
        en: 'NH Co-op Big Data Portal Enhancement',
      },
      period: '2023.06 ~ 2023.11',
      startYear: 2023,
      client: '농협중앙회',
      role: { ko: '개발', en: 'Development' },
      highlights: {
        ko: [
          '빅데이터 조회·분석 화면 기능 고도화',
          '레거시 JSP 시스템 신규 기능 추가 및 버그 수정',
          '대용량 데이터 페이지네이션 및 검색 UI 개선',
        ],
        en: [
          'Big data query and analysis screen enhancement',
          'Legacy JSP system new feature addition and bug fixes',
          'Large dataset pagination and search UI improvement',
        ],
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
        ko: [
          '사내 표준 재사용 UI 컴포넌트 라이브러리 설계·개발',
          '공통 모듈 구조화로 개발 생산성 향상 기여',
          '내부 개발팀 온보딩을 위한 컴포넌트 문서화',
        ],
        en: [
          'In-house standard reusable UI component library',
          'Common module structure for improved dev productivity',
          'Component documentation for internal team onboarding',
        ],
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
        ko: [
          '분석 시스템 QlikSense 구버전 → 신버전 마이그레이션',
          '기존 대시보드 레이아웃 호환성 검증 및 유지',
          '업그레이드 후 QA 및 인수 테스트 지원',
        ],
        en: [
          'QlikSense legacy to latest version migration',
          'Existing dashboard compatibility verification',
          'Post-upgrade QA and acceptance testing support',
        ],
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
        ko: [
          'QlikSense 커스텀 로그인 페이지 개발',
          'SSO(Single Sign-On) 연동으로 통합 인증 구현',
          '기업 보안 정책에 부합하는 인증 흐름 설계',
        ],
        en: [
          'Custom QlikSense login page development',
          'SSO integration for unified authentication',
          'Authentication flow aligned with enterprise security policy',
        ],
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
        ko: [
          '관리자 전용 게시판·공지 CRUD 시스템 개발',
          '역할 기반 접근 제어(RBAC) UI 구현',
          '파일 첨부·다운로드 기능 개발',
        ],
        en: [
          'Admin-only bulletin board and notice CRUD system',
          'Role-based access control (RBAC) UI',
          'File attachment and download functionality',
        ],
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
        ko: [
          'GoJS 라이브러리로 선후행관계 노드-엣지 그래프 구현',
          '복잡한 연관분석 데이터를 인터랙티브 다이어그램으로 시각화',
          '시스템 분석 문서 및 기술 명세 작성',
        ],
        en: [
          'Node-edge precedence relationship graph using GoJS',
          'Complex correlation data visualized as interactive diagram',
          'System analysis documentation and technical spec writing',
        ],
      },
      techStack: ['Java', 'JSP', 'GoJS'],
      category: 'java',
    },
  ];

  const filters: { labelKey: string; value: FilterType }[] = [
    { labelKey: 'filterAll', value: 'all' },
    { labelKey: 'filterReact', value: 'react' },
    { labelKey: 'filterJava', value: 'java' },
    { labelKey: 'filterOther', value: 'other' },
  ];

  const filteredProjects =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

  const getCategoryIcon = (category: Project['category']) => {
    if (category === 'react') return '⚛️';
    if (category === 'java') return '☕';
    return '🔧';
  };

  const yearGroups = [
    { year: 2026, emoji: '✨', items: projects.filter((p) => p.startYear === 2026) },
    { year: 2025, emoji: '🚀', items: projects.filter((p) => p.startYear === 2025) },
    { year: 2024, emoji: '⚡', items: projects.filter((p) => p.startYear === 2024) },
    { year: 2023, emoji: '🌱', items: projects.filter((p) => p.startYear === 2023) },
    { year: 2022, emoji: '🔰', items: projects.filter((p) => p.startYear === 2022) },
  ];

  return (
    <Box
      component="section"
      id="projects"
      ref={ref}
      sx={{ py: { xs: 10, md: 16 }, bgcolor: 'background.paper' }}
    >
      <Box sx={{ maxWidth: 1152, mx: 'auto', px: { xs: 2, md: 4 } }}>
        {/* 섹션 헤더 */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 5,
            transition: 'all 0.7s ease',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: '0.2em' }}
          >
            {t('label')}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.875rem', md: '2.25rem', lg: '3rem' },
              fontWeight: 700,
              mt: 1,
              mb: 2,
            }}
          >
            {t('title1')}{' '}
            <Box component="span" className="gradient-text">
              {t('title2')}
            </Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 512, mx: 'auto' }}>
            {t('description')}
          </Typography>
        </Box>

        {/* 탭 네비게이션 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 5,
            transition: 'all 0.7s ease',
            opacity: isVisible ? 1 : 0,
            transitionDelay: '50ms',
          }}
        >
          <Paper
            elevation={0}
            sx={{
              display: 'inline-flex',
              p: 0.5,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.default',
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              TabIndicatorProps={{ style: { display: 'none' } }}
              sx={{ minHeight: 'auto' }}
            >
              {(['career', 'personal', 'vibe'] as TabType[]).map((tab) => (
                <Tab
                  key={tab}
                  value={tab}
                  label={
                    tab === 'career'
                      ? t('careerTab')
                      : tab === 'personal'
                        ? t('personalTab')
                        : t('vibeTab')
                  }
                  sx={{
                    minHeight: 36,
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'text.secondary',
                    transition: 'all 0.2s ease',
                    '&.Mui-selected': {
                      color: '#fff',
                      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    },
                  }}
                />
              ))}
            </Tabs>
          </Paper>
        </Box>

        {/* ══════ 경력 프로젝트 탭 ══════ */}
        {activeTab === 'career' && (
          <>
            {/* 야간 3D 타임라인 (기존 디자인 유지) */}
            <Box
              sx={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                mb: 6,
                p: { xs: 2, md: 4 },
                transition: 'all 0.7s ease',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                transitionDelay: '100ms',
                background: 'linear-gradient(160deg, #05050f 0%, #0a0a1e 40%, #080818 100%)',
              }}
            >
              {/* 배경 오버레이 */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: `
                    radial-gradient(ellipse at 15% 20%, rgba(99,102,241,0.13) 0%, transparent 55%),
                    radial-gradient(ellipse at 85% 75%, rgba(168,85,247,0.11) 0%, transparent 55%)
                  `,
                }}
              />

              {/* 타임라인 헤더 */}
              <Box sx={{ textAlign: 'center', mb: 4, position: 'relative', zIndex: 10 }}>
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.3em',
                    color: 'rgba(129,140,248,0.8)',
                    textTransform: 'uppercase',
                    mb: 0.5,
                  }}
                >
                  {t('careerJourneyLabel')}
                </Typography>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', mb: 0.5 }}>
                  {t('careerJourneyTitle')}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                  {language === 'ko'
                    ? `총 ${projects.length}${t('careerJourneySummary')}`
                    : `${projects.length}${t('careerJourneySummary')}`}
                </Typography>
              </Box>

              {/* 연도별 그룹 */}
              {yearGroups.map((group, groupIdx) => (
                <Box
                  key={group.year}
                  sx={{ position: 'relative', zIndex: 10, mt: groupIdx > 0 ? 4 : 0 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        px: 2,
                        py: 0.75,
                        borderRadius: 2,
                        flexShrink: 0,
                        background:
                          'linear-gradient(135deg, rgba(99,102,241,0.28) 0%, rgba(168,85,247,0.28) 100%)',
                        border: '1px solid rgba(99,102,241,0.45)',
                        boxShadow: '0 0 16px rgba(99,102,241,0.2)',
                      }}
                    >
                      <Typography sx={{ fontWeight: 800, color: '#fff', letterSpacing: '0.05em' }}>
                        {group.emoji} {group.year}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        height: 1,
                        background: 'linear-gradient(90deg, rgba(99,102,241,0.5), transparent)',
                      }}
                    />
                    <Typography
                      sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}
                    >
                      {group.items.length}{t('yearProjectSuffix')}
                    </Typography>
                  </Box>

                  <Box sx={{ pl: { xs: 2, md: 3.5 }, position: 'relative' }}>
                    {/* 세로 라인 */}
                    <div
                      className="timeline-line"
                      style={{
                        position: 'absolute',
                        left: '7px',
                        top: 10,
                        bottom: 10,
                        width: 2,
                        borderRadius: 2,
                      }}
                    />
                    {group.items.map((project, itemIdx) => (
                      <Box
                        key={project.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: { xs: 2, md: 3 },
                          position: 'relative',
                          mb: itemIdx < group.items.length - 1 ? 2.5 : 0,
                        }}
                      >
                        {/* 닷 */}
                        <div
                          className="timeline-dot"
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            flexShrink: 0,
                            marginTop: 16,
                            marginLeft: 0,
                            zIndex: 10,
                            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                          }}
                        />
                        {/* 3D 카드 */}
                        <Box
                          sx={{
                            flex: 1,
                            p: { xs: 2, md: 2.5 },
                            borderRadius: 3,
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(99,102,241,0.18)',
                            backdropFilter: 'blur(10px)',
                            transformOrigin: 'left center',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: 'rgba(99,102,241,0.08)',
                              border: '1px solid rgba(99,102,241,0.45)',
                              boxShadow:
                                '0 8px 40px rgba(99,102,241,0.18), inset 0 1px 0 rgba(255,255,255,0.06)',
                              transform:
                                'perspective(800px) rotateY(-3deg) translateX(6px) translateY(-2px)',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              justifyContent: 'space-between',
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: '0.75rem',
                                  fontWeight: 600,
                                  display: 'block',
                                  mb: 0.25,
                                  color: 'rgba(99,102,241,0.85)',
                                }}
                              >
                                {project.client}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: '0.875rem',
                                  fontWeight: 700,
                                  color: '#fff',
                                  lineHeight: 1.3,
                                }}
                              >
                                {project.title[language]}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                flexShrink: 0,
                                px: 1,
                                py: 0.25,
                                borderRadius: 1,
                                border: '1px solid rgba(168,85,247,0.3)',
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: '0.6rem',
                                  fontWeight: 600,
                                  whiteSpace: 'nowrap',
                                  color: 'rgba(168,85,247,0.8)',
                                }}
                              >
                                {project.period}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 1.5 }}>
                            {project.highlights[language].slice(0, 2).map((point, i) => (
                              <Box
                                key={i}
                                sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75 }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: '0.6rem',
                                    mt: 0.5,
                                    flexShrink: 0,
                                    color: '#6366f1',
                                  }}
                                >
                                  ▹
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: '0.71rem',
                                    lineHeight: 1.6,
                                    color: 'rgba(255,255,255,0.5)',
                                  }}
                                >
                                  {point}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {project.techStack.map((tech) => (
                              <Box
                                key={tech}
                                sx={{
                                  fontSize: '0.6rem',
                                  fontWeight: 600,
                                  px: 1,
                                  py: 0.25,
                                  borderRadius: 1,
                                  color: 'rgba(168,85,247,0.85)',
                                  background: 'rgba(168,85,247,0.1)',
                                  border: '1px solid rgba(168,85,247,0.2)',
                                }}
                              >
                                {tech}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}

              {/* 하단 라이브 인디케이터 */}
              <Box sx={{ textAlign: 'center', mt: 4, position: 'relative', zIndex: 10 }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: 3,
                    py: 1.25,
                    borderRadius: 10,
                    background: 'rgba(99,102,241,0.1)',
                    border: '1px solid rgba(99,102,241,0.3)',
                    boxShadow: '0 0 24px rgba(99,102,241,0.12)',
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: '#4ade80',
                      boxShadow: '0 0 8px rgba(74,222,128,0.8)',
                    }}
                  />
                  <Typography
                    sx={{ fontSize: '0.78rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}
                  >
                    {t('currentlyActive')}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* 프로젝트 상세 소제목 */}
            <Box
              sx={{
                textAlign: 'center',
                mb: 3,
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.7s ease 200ms',
              }}
            >
              <Typography variant="h5" fontWeight={700} mb={0.5}>
                {t('projectDetailTitle')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('projectDetailDesc')}
              </Typography>
            </Box>

            {/* 필터 */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                mb: 4,
                flexWrap: 'wrap',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.7s ease 250ms',
              }}
            >
              {filters.map((filter) => (
                <Button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  variant={activeFilter === filter.value ? 'contained' : 'outlined'}
                  size="small"
                  sx={{
                    borderRadius: 3,
                    fontWeight: 500,
                    ...(activeFilter === filter.value
                      ? {
                          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                          color: '#fff',
                          border: 'none',
                        }
                      : {
                          borderColor: 'divider',
                          color: 'text.secondary',
                          '&:hover': {
                            borderColor: 'primary.main',
                            color: 'text.primary',
                            bgcolor: 'transparent',
                          },
                        }),
                  }}
                >
                  {t(filter.labelKey)}
                </Button>
              ))}
            </Box>

            {/* 카드 그리드 */}
            <Grid
              container
              spacing={2.5}
              sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s ease 300ms',
              }}
            >
              {filteredProjects.map((project, index) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={project.id}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 20px 40px rgba(99,102,241,0.1)',
                      },
                      transition: `all 0.3s ease ${index * 40}ms`,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      bgcolor: 'background.default',
                    }}
                  >
                    {/* 카드 상단 바 */}
                    <Box
                      sx={{
                        py: 2,
                        px: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'primary.main',
                        opacity: 0.96,
                      }}
                    >
                      <Typography sx={{ fontSize: '1.5rem' }}>
                        {getCategoryIcon(project.category)}
                      </Typography>
                      <Chip
                        label={project.period}
                        size="small"
                        sx={{
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          color: 'primary.main',
                          bgcolor: 'background.default',
                          border: '1px solid',
                          borderColor: 'primary.main',
                          opacity: 0.9,
                        }}
                      />
                    </Box>

                    {/* 카드 본문 */}
                    <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'primary.main',
                          fontWeight: 600,
                          mb: 0.75,
                          display: 'block',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {project.client}
                      </Typography>
                      <Typography variant="body1" fontWeight={700} mb={2} lineHeight={1.3}>
                        {project.title[language]}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                        {project.highlights[language].map((point, i) => (
                          <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                mt: 0.75,
                                flexShrink: 0,
                                opacity: 0.8,
                              }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ lineHeight: 1.6 }}
                            >
                              {point}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                      <Typography variant="caption" color="text.secondary" mb={2}>
                        {t('roleLabel')}
                        <Box component="span" sx={{ color: 'text.primary', fontWeight: 500 }}>
                          {project.role[language]}
                        </Box>
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 'auto' }}>
                        {project.techStack.map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: '0.7rem',
                              borderColor: 'divider',
                              color: 'text.secondary',
                              height: 20,
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* ══════ 개인 프로젝트 탭 ══════ */}
        {activeTab === 'personal' && (
          <Box
            sx={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'all 0.7s ease 100ms',
            }}
          >
            {/* 소제목 */}
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Typography variant="h5" fontWeight={700} mb={1}>
                {t('personalProjectsTitle')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('personalProjectsDesc')}
              </Typography>
            </Box>

            <Grid container spacing={2.5}>
              {PERSONAL_PROJECTS.map((project, index) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={project.id}>
                  <Paper
                    component={project.path ? 'button' : 'div'}
                    elevation={0}
                    onClick={() => project.path && navigate(project.path)}
                    sx={{
                      width: '100%',
                      textAlign: 'left',
                      borderRadius: 4,
                      overflow: 'hidden',
                      border: '1px solid',
                      borderColor: 'divider',
                      cursor: project.path ? 'pointer' : 'default',
                      '&:hover': project.path
                        ? {
                            transform: 'translateY(-4px)',
                            borderColor: `${project.accentColor}55`,
                            boxShadow: `0 20px 40px ${project.accentColor}18`,
                          }
                        : {},
                      transition: `all 0.3s ease ${index * 60}ms`,
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: 'background.default',
                    }}
                  >
                    {/* 카드 상단 바 */}
                    <Box
                      sx={{
                        py: 2,
                        px: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        background: `${project.accentColor}0d`,
                      }}
                    >
                      <Typography sx={{ fontSize: '1.5rem' }}>{project.icon}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {/* 상태 뱃지 */}
                        <Box
                          sx={{
                            px: 1,
                            py: 0.25,
                            borderRadius: 1,
                            fontSize: '0.6rem',
                            fontWeight: 700,
                            ...(project.status === 'completed'
                              ? {
                                  color: '#4ade80',
                                  bgcolor: 'rgba(74,222,128,0.12)',
                                  border: '1px solid rgba(74,222,128,0.3)',
                                }
                              : project.status === 'in-progress'
                                ? {
                                    color: '#fb923c',
                                    bgcolor: 'rgba(251,146,60,0.12)',
                                    border: '1px solid rgba(251,146,60,0.3)',
                                  }
                                : {
                                    color: '#94a3b8',
                                    bgcolor: 'rgba(148,163,184,0.12)',
                                    border: '1px solid rgba(148,163,184,0.3)',
                                  }),
                          }}
                        >
                          {project.status === 'completed'
                            ? t('statusCompleted')
                            : project.status === 'in-progress'
                              ? t('statusInProgress')
                              : t('statusPlanned')}
                        </Box>
                        {/* 카테고리 뱃지 */}
                        <Box
                          sx={{
                            px: 1.25,
                            py: 0.5,
                            borderRadius: 2,
                            color: project.accentColor,
                            background: `${project.accentColor}18`,
                            border: `1px solid ${project.accentColor}40`,
                            fontSize: '0.65rem',
                            fontWeight: 600,
                          }}
                        >
                          {project.badge}
                        </Box>
                      </Box>
                    </Box>

                    {/* 카드 본문 */}
                    <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant="body1"
                        fontWeight={700}
                        mb={1.5}
                        lineHeight={1.3}
                        sx={{ color: project.accentColor }}
                      >
                        {project.title[language]}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        lineHeight={1.6}
                        mb={2}
                        sx={{ flex: 1 }}
                      >
                        {project.description[language]}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 0.75,
                          mb: project.path ? 2 : 0,
                        }}
                      >
                        {project.techStack.map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: '0.7rem',
                              borderColor: 'divider',
                              color: 'text.secondary',
                              height: 20,
                            }}
                          />
                        ))}
                      </Box>
                      {project.path && (
                        <Typography
                          variant="caption"
                          fontWeight={600}
                          sx={{ color: project.accentColor, mt: 'auto' }}
                        >
                          {t('viewDemo')}
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              ))}

              {/* Coming Soon 카드 */}
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    border: '2px dashed',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 8,
                    px: 3,
                    textAlign: 'center',
                    bgcolor: 'transparent',
                    minHeight: 200,
                  }}
                >
                  <Typography sx={{ fontSize: '1.875rem', mb: 1.5 }}>✦</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'text.secondary',
                      opacity: 0.5,
                    }}
                  >
                    {t('nextProject')}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ opacity: 0.4, mt: 0.5 }}
                  >
                    {t('comingSoon')}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* ══════ 바이브 프로젝트 탭 ══════ */}
        {activeTab === 'vibe' && (
          <div
            className="transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
              transitionDelay: '100ms',
            }}
          >
            {/* 소제목 */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2">
                {t('vibeProjectsTitle')}
              </h3>
              <p className="text-sm text-[#4a4a5a] dark:text-[#a0a0b0]">{t('vibeDesc')}</p>
            </div>

            {/* 바이브 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {VIBE_PROJECTS.map((project, index) => (
                <div
                  key={project.id}
                  onClick={() => project.path && navigate(project.path)}
                  className="rounded-2xl overflow-hidden bg-white dark:bg-[#0a0a0f] border border-black/[0.08] dark:border-white/[0.08] hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  style={{
                    transitionDelay: `${index * 60}ms`,
                    cursor: project.path ? 'pointer' : 'default',
                    boxShadow: 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (project.path) {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        `0 20px 40px ${project.accentColor}20`;
                      (e.currentTarget as HTMLDivElement).style.borderColor =
                        `${project.accentColor}44`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLDivElement).style.borderColor = '';
                  }}
                >
                  {/* 카드 상단 바 */}
                  <div
                    className="py-4 px-5 flex items-center justify-between border-b border-black/[0.08] dark:border-white/[0.08]"
                    style={{ background: `${project.accentColor}0d` }}
                  >
                    <span className="text-2xl">{project.icon}</span>
                    <span
                      className="text-[0.65rem] font-semibold px-2.5 py-1 rounded-lg"
                      style={{
                        color: project.accentColor,
                        background: `${project.accentColor}18`,
                        border: `1px solid ${project.accentColor}40`,
                      }}
                    >
                      {project.badge}
                    </span>
                  </div>

                  {/* 카드 본문 */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h4
                      className="font-bold text-base mb-3 leading-snug"
                      style={{ color: project.accentColor }}
                    >
                      {project.title[language]}
                    </h4>
                    <p className="text-xs text-[#4a4a5a] dark:text-[#a0a0b0] leading-relaxed mb-4 flex-1">
                      {project.description[language]}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded-md bg-[#f8f9fa] dark:bg-[#12121a] border border-black/[0.08] dark:border-white/[0.08] text-[#4a4a5a] dark:text-[#a0a0b0]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.path && (
                      <span
                        className="text-xs font-semibold mt-auto"
                        style={{ color: project.accentColor }}
                      >
                        {t('viewDemo')}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* 바이브 Coming Soon 카드 */}
              <div className="rounded-2xl border-2 border-dashed border-black/[0.08] dark:border-white/[0.08] flex flex-col items-center justify-center py-16 px-6 text-center">
                <span className="text-3xl mb-3">🌊</span>
                <p className="text-xs font-semibold tracking-widest uppercase text-[#4a4a5a]/50 dark:text-[#a0a0b0]/50">
                  {t('nextVibeProject')}
                </p>
                <p className="text-xs text-[#4a4a5a]/40 dark:text-[#a0a0b0]/40 mt-1">
                  {t('comingSoon')}
                </p>
              </div>
            </div>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default CareerProjects;
