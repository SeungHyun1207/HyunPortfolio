import { useScrollAnimation } from '@hooks'
import { useSettings } from '@/contexts/SettingsContext'

interface Skill {
  name: string
  level: number
  category: string
}

const Skills = () => {
  const { t } = useSettings()
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 })

  const skills: Skill[] = [
    { name: 'React', level: 90, category: 'frontend' },
    { name: 'TypeScript', level: 85, category: 'frontend' },
    { name: 'JavaScript', level: 95, category: 'frontend' },
    { name: 'Next.js', level: 80, category: 'frontend' },
    { name: 'HTML/CSS', level: 95, category: 'frontend' },
    { name: 'Tailwind CSS', level: 85, category: 'frontend' },
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
    <section
      id="skills"
      ref={ref}
      className="py-20 md:py-32 bg-white dark:bg-[#0a0a0f]"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {t('skills.label')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            {t('skills.title1')}{' '}
            <span className="gradient-text">{t('skills.title2')}</span>
          </h2>
          <p className="text-[#4a4a5a] dark:text-[#a0a0b0] max-w-2xl mx-auto">
            {t('skills.description')}
          </p>
        </div>

        {/* Content */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            transitionDelay: '200ms',
          }}
        >
          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="p-4 rounded-xl bg-[#f8f9fa] dark:bg-[#12121a] border border-black/[0.08] dark:border-white/[0.08] hover:border-primary/50 transition-all duration-300"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-[#1a1a2e] dark:text-white">{skill.name}</span>
                  <span className="text-sm font-medium text-primary">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white dark:bg-[#0a0a0f] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                      width: isVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 100 + 300}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-center mb-6 text-[#1a1a2e] dark:text-white">
              {t('skills.mainTech')}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech, index) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/[0.08] dark:border-white/[0.08] text-sm text-[#4a4a5a] dark:text-[#a0a0b0] hover:border-primary hover:scale-105 transition-all duration-300 bg-white dark:bg-[#12121a]"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <span className="text-lg">{tech.icon}</span>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Block */}
          <div className="max-w-2xl mx-auto rounded-xl overflow-hidden bg-[#f8f9fa] dark:bg-[#12121a] border border-black/[0.08] dark:border-white/[0.08]">
            {/* Code Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#0a0a0f] border-b border-black/[0.08] dark:border-white/[0.08]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <span className="text-xs text-[#4a4a5a] dark:text-[#a0a0b0] ml-1">developer.ts</span>
            </div>
            {/* Code Content */}
            <pre className="p-4 text-sm font-mono overflow-x-auto m-0 text-[#1a1a2e] dark:text-white">
              <code>
                <span style={{ color: '#a855f7' }}>const</span>{' '}
                <span style={{ color: '#60a5fa' }}>developer</span>{' '}
                <span>=</span> {'{'}
                {'\n'}
                {'  '}<span style={{ color: '#4ade80' }}>name</span>:{' '}
                <span style={{ color: '#facc15' }}>"Hyun"</span>,{'\n'}
                {'  '}<span style={{ color: '#4ade80' }}>role</span>:{' '}
                <span style={{ color: '#facc15' }}>"Frontend Developer"</span>,{'\n'}
                {'  '}<span style={{ color: '#4ade80' }}>skills</span>:{' '}
                [<span style={{ color: '#facc15' }}>"React"</span>,{' '}
                <span style={{ color: '#facc15' }}>"TypeScript"</span>,{' '}
                <span style={{ color: '#facc15' }}>"Next.js"</span>],{'\n'}
                {'  '}<span style={{ color: '#4ade80' }}>passion</span>:{' '}
                <span style={{ color: '#facc15' }}>"Creating beautiful UIs"</span>,{'\n'}
                {'\n'}
                {'  '}<span style={{ color: '#60a5fa' }}>code</span>:{' '}
                <span style={{ color: '#a855f7' }}>{'() =>'}</span>{' '}
                <span style={{ color: '#facc15' }}>"Clean & Efficient"</span>,{'\n'}
                {'  '}<span style={{ color: '#60a5fa' }}>learn</span>:{' '}
                <span style={{ color: '#a855f7' }}>{'() =>'}</span>{' '}
                <span style={{ color: '#facc15' }}>"Never Stop"</span>,{'\n'}
                {'  '}<span style={{ color: '#60a5fa' }}>coffee</span>:{' '}
                <span style={{ color: '#a855f7' }}>{'() =>'}</span>{' '}
                <span style={{ color: '#facc15' }}>"Always ☕"</span>{'\n'}
                {'}'};
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
