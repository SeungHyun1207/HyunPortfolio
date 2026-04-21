import { useState, type ReactNode } from 'react'
import { useScrollAnimation } from '@hooks'
import { usePageTranslation } from '@hooks/usePageTranslation'
import { translations } from './skills.i18n'
import type { Skill } from '@models/home/skills/SkillsModel'
import {
  Box,
  Chip,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid'

// ─── Syntax colors ─────────────────────────────────────────
const SC = {
  keyword: '#a855f7',  // const, import, function, return
  name:    '#60a5fa',  // 변수/함수명
  prop:    '#4ade80',  // 객체 프로퍼티
  string:  '#facc15',  // 문자열
  comment: '#64748b',  // 주석
  tag:     '#f472b6',  // JSX 태그
  type:    '#22d3ee',  // TS 타입
} as const

// ─── 언어별 코드 스니펫 ──────────────────────────────────────
const codeSnippets: Record<string, { file: string; code: ReactNode }> = {
  React: {
    file: 'Component.tsx',
    code: (
      <>
        <span style={{ color: SC.keyword }}>import</span>{' '}
        {'{ '}<span style={{ color: SC.name }}>useState</span>{' }'}{' '}
        <span style={{ color: SC.keyword }}>from</span>{' '}
        <span style={{ color: SC.string }}>"react"</span>;{'\n\n'}
        <span style={{ color: SC.keyword }}>export default function</span>{' '}
        <span style={{ color: SC.name }}>Counter</span>() {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.keyword }}>const</span> [
        <span style={{ color: SC.prop }}>count</span>,{' '}
        <span style={{ color: SC.prop }}>setCount</span>] ={' '}
        <span style={{ color: SC.name }}>useState</span>(
        <span style={{ color: SC.string }}>0</span>);{'\n\n'}
        {'  '}<span style={{ color: SC.keyword }}>return</span> ({'\n'}
        {'    '}<span style={{ color: SC.tag }}>&lt;button</span>{' '}
        <span style={{ color: SC.prop }}>onClick</span>={'{'}() =&gt;{' '}
        <span style={{ color: SC.name }}>setCount</span>(c =&gt; c + 1){'}'}
        <span style={{ color: SC.tag }}>&gt;</span>{'\n'}
        {'      '}Count: {'{'}count{'}'}
        {'\n'}
        {'    '}<span style={{ color: SC.tag }}>&lt;/button&gt;</span>{'\n'}
        {'  '});{'\n'}
        {'}'}
      </>
    ),
  },
  TypeScript: {
    file: 'types.ts',
    code: (
      <>
        <span style={{ color: SC.keyword }}>interface</span>{' '}
        <span style={{ color: SC.type }}>User</span> {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.prop }}>id</span>:{' '}
        <span style={{ color: SC.type }}>number</span>;{'\n'}
        {'  '}<span style={{ color: SC.prop }}>name</span>:{' '}
        <span style={{ color: SC.type }}>string</span>;{'\n'}
        {'  '}<span style={{ color: SC.prop }}>role</span>:{' '}
        <span style={{ color: SC.string }}>"admin"</span> |{' '}
        <span style={{ color: SC.string }}>"user"</span>;{'\n'}
        {'}'}
        {'\n\n'}
        <span style={{ color: SC.keyword }}>function</span>{' '}
        <span style={{ color: SC.name }}>greet</span>&lt;
        <span style={{ color: SC.type }}>T</span> <span style={{ color: SC.keyword }}>extends</span>{' '}
        <span style={{ color: SC.type }}>User</span>&gt;(u:{' '}
        <span style={{ color: SC.type }}>T</span>){'\n'}
        : <span style={{ color: SC.type }}>string</span> {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.keyword }}>return</span> `Hello, ${'{'}u.name{'}'}`;{'\n'}
        {'}'}
      </>
    ),
  },
  'Next.js': {
    file: 'page.tsx',
    code: (
      <>
        <span style={{ color: SC.comment }}>// app/page.tsx</span>{'\n'}
        <span style={{ color: SC.keyword }}>export default async function</span>{' '}
        <span style={{ color: SC.name }}>Page</span>() {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.keyword }}>const</span>{' '}
        <span style={{ color: SC.prop }}>res</span> ={' '}
        <span style={{ color: SC.keyword }}>await</span>{' '}
        <span style={{ color: SC.name }}>fetch</span>({'\n'}
        {'    '}<span style={{ color: SC.string }}>"https://api.example.com/posts"</span>,{'\n'}
        {'    '}{'{ '}<span style={{ color: SC.prop }}>next</span>: {'{ '}
        <span style={{ color: SC.prop }}>revalidate</span>:{' '}
        <span style={{ color: SC.string }}>60</span> {'} }'}
        {'\n'}
        {'  '});{'\n'}
        {'  '}<span style={{ color: SC.keyword }}>const</span>{' '}
        <span style={{ color: SC.prop }}>posts</span> ={' '}
        <span style={{ color: SC.keyword }}>await</span>{' '}
        <span style={{ color: SC.prop }}>res</span>.
        <span style={{ color: SC.name }}>json</span>();{'\n'}
        {'  '}<span style={{ color: SC.keyword }}>return</span>{' '}
        <span style={{ color: SC.tag }}>&lt;PostList</span>{' '}
        <span style={{ color: SC.prop }}>data</span>={'{'}posts{'}'}{' '}
        <span style={{ color: SC.tag }}>/&gt;</span>;{'\n'}
        {'}'}
      </>
    ),
  },
  Vite: {
    file: 'vite.config.ts',
    code: (
      <>
        <span style={{ color: SC.keyword }}>import</span>{' '}
        {'{ '}<span style={{ color: SC.name }}>defineConfig</span>{' }'}{' '}
        <span style={{ color: SC.keyword }}>from</span>{' '}
        <span style={{ color: SC.string }}>"vite"</span>;{'\n'}
        <span style={{ color: SC.keyword }}>import</span>{' '}
        <span style={{ color: SC.name }}>react</span>{' '}
        <span style={{ color: SC.keyword }}>from</span>{' '}
        <span style={{ color: SC.string }}>"@vitejs/plugin-react"</span>;{'\n\n'}
        <span style={{ color: SC.keyword }}>export default</span>{' '}
        <span style={{ color: SC.name }}>defineConfig</span>({'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.prop }}>plugins</span>: [
        <span style={{ color: SC.name }}>react</span>()],{'\n'}
        {'  '}<span style={{ color: SC.prop }}>server</span>: {'{ '}
        <span style={{ color: SC.prop }}>port</span>:{' '}
        <span style={{ color: SC.string }}>999</span>,{' '}
        <span style={{ color: SC.prop }}>open</span>:{' '}
        <span style={{ color: SC.string }}>true</span> {'}'},{'\n'}
        {'  '}<span style={{ color: SC.prop }}>resolve</span>: {'{'}
        {'\n'}
        {'    '}<span style={{ color: SC.prop }}>alias</span>: {'{ '}
        <span style={{ color: SC.string }}>"@"</span>:{' '}
        <span style={{ color: SC.string }}>"/src"</span> {'}'}
        {'\n'}
        {'  '}{'}'}
        {'\n'}
        {'}'});
      </>
    ),
  },
  'Tailwind CSS': {
    file: 'Button.tsx',
    code: (
      <>
        <span style={{ color: SC.keyword }}>export function</span>{' '}
        <span style={{ color: SC.name }}>Button</span>({'{ '}
        <span style={{ color: SC.prop }}>children</span> {'}'}) {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.keyword }}>return</span> ({'\n'}
        {'    '}<span style={{ color: SC.tag }}>&lt;button</span>{'\n'}
        {'      '}<span style={{ color: SC.prop }}>className</span>=
        <span style={{ color: SC.string }}>"px-4 py-2 rounded-lg</span>{'\n'}
        {'        '}<span style={{ color: SC.string }}>bg-indigo-500 hover:bg-indigo-600</span>{'\n'}
        {'        '}<span style={{ color: SC.string }}>text-white font-semibold</span>{'\n'}
        {'        '}<span style={{ color: SC.string }}>transition-colors shadow-lg"</span>{'\n'}
        {'    '}<span style={{ color: SC.tag }}>&gt;</span>{'\n'}
        {'      '}{'{'}children{'}'}
        {'\n'}
        {'    '}<span style={{ color: SC.tag }}>&lt;/button&gt;</span>{'\n'}
        {'  '});{'\n'}
        {'}'}
      </>
    ),
  },
  Zustand: {
    file: 'useStore.ts',
    code: (
      <>
        <span style={{ color: SC.keyword }}>import</span>{' '}
        {'{ '}<span style={{ color: SC.name }}>create</span>{' }'}{' '}
        <span style={{ color: SC.keyword }}>from</span>{' '}
        <span style={{ color: SC.string }}>"zustand"</span>;{'\n\n'}
        <span style={{ color: SC.keyword }}>interface</span>{' '}
        <span style={{ color: SC.type }}>BearState</span> {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.prop }}>bears</span>:{' '}
        <span style={{ color: SC.type }}>number</span>;{'\n'}
        {'  '}<span style={{ color: SC.prop }}>increase</span>:{' '}
        () =&gt; <span style={{ color: SC.type }}>void</span>;{'\n'}
        {'}'}
        {'\n\n'}
        <span style={{ color: SC.keyword }}>export const</span>{' '}
        <span style={{ color: SC.name }}>useBearStore</span> ={' '}
        <span style={{ color: SC.name }}>create</span>&lt;
        <span style={{ color: SC.type }}>BearState</span>&gt;(({' '}
        <span style={{ color: SC.prop }}>set</span> ) =&gt; ({'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.prop }}>bears</span>:{' '}
        <span style={{ color: SC.string }}>0</span>,{'\n'}
        {'  '}<span style={{ color: SC.prop }}>increase</span>: () =&gt;{'\n'}
        {'    '}<span style={{ color: SC.name }}>set</span>(s =&gt; ({'{ '}
        <span style={{ color: SC.prop }}>bears</span>: s.bears + 1 {'}'})),{'\n'}
        {'}'}));
      </>
    ),
  },
  'React Query': {
    file: 'useUsers.ts',
    code: (
      <>
        <span style={{ color: SC.keyword }}>import</span>{' '}
        {'{ '}<span style={{ color: SC.name }}>useQuery</span>{' }'}{' '}
        <span style={{ color: SC.keyword }}>from</span>{' '}
        <span style={{ color: SC.string }}>"@tanstack/react-query"</span>;{'\n\n'}
        <span style={{ color: SC.keyword }}>export function</span>{' '}
        <span style={{ color: SC.name }}>useUsers</span>() {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.keyword }}>return</span>{' '}
        <span style={{ color: SC.name }}>useQuery</span>({'{'}
        {'\n'}
        {'    '}<span style={{ color: SC.prop }}>queryKey</span>: [
        <span style={{ color: SC.string }}>"users"</span>],{'\n'}
        {'    '}<span style={{ color: SC.prop }}>queryFn</span>:{' '}
        <span style={{ color: SC.keyword }}>async</span> () =&gt; {'{'}
        {'\n'}
        {'      '}<span style={{ color: SC.keyword }}>const</span>{' '}
        <span style={{ color: SC.prop }}>res</span> ={' '}
        <span style={{ color: SC.keyword }}>await</span>{' '}
        <span style={{ color: SC.name }}>fetch</span>(
        <span style={{ color: SC.string }}>"/api/users"</span>);{'\n'}
        {'      '}<span style={{ color: SC.keyword }}>return</span>{' '}
        <span style={{ color: SC.prop }}>res</span>.
        <span style={{ color: SC.name }}>json</span>();{'\n'}
        {'    '}{'}'},{'\n'}
        {'    '}<span style={{ color: SC.prop }}>staleTime</span>:{' '}
        <span style={{ color: SC.string }}>60_000</span>,{'\n'}
        {'  '}{'}'});{'\n'}
        {'}'}
      </>
    ),
  },
  'Framer Motion': {
    file: 'FadeIn.tsx',
    code: (
      <>
        <span style={{ color: SC.keyword }}>import</span>{' '}
        {'{ '}<span style={{ color: SC.name }}>motion</span>{' }'}{' '}
        <span style={{ color: SC.keyword }}>from</span>{' '}
        <span style={{ color: SC.string }}>"framer-motion"</span>;{'\n\n'}
        <span style={{ color: SC.keyword }}>export function</span>{' '}
        <span style={{ color: SC.name }}>FadeIn</span>({'{ '}
        <span style={{ color: SC.prop }}>children</span> {'}'}) {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.keyword }}>return</span> ({'\n'}
        {'    '}<span style={{ color: SC.tag }}>&lt;motion.div</span>{'\n'}
        {'      '}<span style={{ color: SC.prop }}>initial</span>={'{{ '}
        <span style={{ color: SC.prop }}>opacity</span>:{' '}
        <span style={{ color: SC.string }}>0</span>,{' '}
        <span style={{ color: SC.prop }}>y</span>:{' '}
        <span style={{ color: SC.string }}>20</span> {'}}'}
        {'\n'}
        {'      '}<span style={{ color: SC.prop }}>animate</span>={'{{ '}
        <span style={{ color: SC.prop }}>opacity</span>:{' '}
        <span style={{ color: SC.string }}>1</span>,{' '}
        <span style={{ color: SC.prop }}>y</span>:{' '}
        <span style={{ color: SC.string }}>0</span> {'}}'}
        {'\n'}
        {'      '}<span style={{ color: SC.prop }}>transition</span>={'{{ '}
        <span style={{ color: SC.prop }}>duration</span>:{' '}
        <span style={{ color: SC.string }}>0.5</span> {'}}'}
        {'\n'}
        {'    '}<span style={{ color: SC.tag }}>&gt;</span>
        {'{'}children{'}'}
        <span style={{ color: SC.tag }}>&lt;/motion.div&gt;</span>{'\n'}
        {'  '});{'\n'}
        {'}'}
      </>
    ),
  },
}

const Skills = () => {
  const { t } = usePageTranslation(translations)
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 })
  const [selectedTech, setSelectedTech] = useState<string>('React')

  const skills: Skill[] = [
    { name: 'React', level: 90, category: 'frontend' },
    { name: 'TypeScript', level: 85, category: 'frontend' },
    { name: 'JavaScript', level: 95, category: 'frontend' },
    { name: 'Next.js', level: 80, category: 'frontend' },
    { name: 'HTML/CSS', level: 95, category: 'frontend' },
    { name: 'Tailwind CSS', level: 70, category: 'frontend' },
    { name: 'Node.js', level: 70, category: 'backend' },
    { name: 'Git', level: 85, category: 'tools' },
    { name: 'Figma', level: 75, category: 'tools' },
  ]

  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Vite', icon: '⚡' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'Zustand', icon: '🐻' },
    { name: 'React Query', icon: '🔄' },
    { name: 'Framer Motion', icon: '✨' },
  ]

  return (
    <Box
      component="section"
      id="skills"
      ref={ref}
      sx={{ py: { xs: 10, md: 16 }, bgcolor: 'background.default' }}
    >
      <Box sx={{ maxWidth: 1152, mx: 'auto', px: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 8,
            transition: 'all 0.7s ease',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: '0.2em' }}>
            {t('label')}
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.875rem', md: '2.25rem', lg: '3rem' }, fontWeight: 700, mt: 1, mb: 2 }}
          >
            {t('title1')}{' '}
            <Box component="span" className="gradient-text">{t('title2')}</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 512, mx: 'auto' }}>
            {t('description')}
          </Typography>
        </Box>

        {/* Content */}
        <Box
          sx={{
            transition: 'all 0.7s ease',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            transitionDelay: '200ms',
          }}
        >
          {/* Skills Grid */}
          <Grid container spacing={2} sx={{ mb: 6 }}>
            {skills.map((skill, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={skill.name}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': { borderColor: 'primary.main', opacity: 0.85 },
                    transition: 'all 0.3s ease',
                    transitionDelay: `${index * 50}ms`,
                    bgcolor: 'background.paper',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" fontWeight={500}>{skill.name}</Typography>
                    <Typography variant="body2" fontWeight={500} color="primary.main">{skill.level}%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={isVisible ? skill.level : 0}
                    sx={{
                      bgcolor: 'background.default',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                        borderRadius: 4,
                        transition: 'transform 1s ease-out',
                        transitionDelay: `${index * 100 + 300}ms`,
                      },
                    }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Tech Stack */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h6" fontWeight={600} textAlign="center" mb={3}>
              {t('mainTech')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5 }}>
              {techStack.map((tech, index) => {
                const isActive = selectedTech === tech.name
                return (
                  <Chip
                    key={tech.name}
                    label={`${tech.icon} ${tech.name}`}
                    variant={isActive ? 'filled' : 'outlined'}
                    clickable
                    onClick={() => setSelectedTech(tech.name)}
                    sx={{
                      cursor: 'pointer',
                      borderColor: isActive ? 'primary.main' : 'divider',
                      color: isActive ? 'primary.main' : 'text.secondary',
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 400,
                      transitionDelay: `${index * 50}ms`,
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.3s ease',
                      bgcolor: isActive ? 'rgba(99, 102, 241, 0.12)' : 'background.paper',
                    }}
                  />
                )
              })}
            </Box>
          </Box>

          {/* Code Block */}
          <Paper
            elevation={0}
            sx={{
              maxWidth: 512,
              mx: 'auto',
              borderRadius: 3,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            {/* Code Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1.5,
                bgcolor: 'background.default',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f87171', opacity: 0.8 }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#facc15', opacity: 0.8 }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#4ade80', opacity: 0.8 }} />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                {codeSnippets[selectedTech]?.file ?? 'developer.ts'}
              </Typography>
            </Box>
            {/* Code Content */}
            <Box
              component="pre"
              key={selectedTech}
              sx={{
                p: 2,
                fontSize: '0.875rem',
                fontFamily: "'Fira Code', monospace",
                overflowX: 'auto',
                m: 0,
                color: 'text.primary',
                minHeight: 280,
                animation: 'fadeIn 0.3s ease',
                '@keyframes fadeIn': {
                  from: { opacity: 0, transform: 'translateY(4px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              <code>{codeSnippets[selectedTech]?.code}</code>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}

export default Skills
