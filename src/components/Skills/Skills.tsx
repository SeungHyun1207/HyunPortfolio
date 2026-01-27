import { useScrollAnimation } from '@hooks'
import { cn } from '@utils'

interface Skill {
  name: string
  level: number
  category: string
}

/**
 * Skills 섹션 컴포넌트
 */
const Skills = () => {
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
    { name: 'Tailwind', icon: '🎨' },
    { name: 'Zustand', icon: '🐻' },
    { name: 'React Query', icon: '🔄' },
    { name: 'Framer Motion', icon: '✨' },
  ]

  return (
    <section id="skills" ref={ref} className="py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div
          className={cn(
            'text-center mb-16',
            'transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <span className="text-accent text-sm font-medium uppercase tracking-wider">
            Skills
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            기술 <span className="gradient-text">스택</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            지속적인 학습과 실무 경험을 통해 다양한 기술을 습득했습니다
          </p>
        </div>

        {/* Content */}
        <div
          className={cn(
            'transition-all duration-700 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={cn(
                  'p-4 rounded-lg',
                  'bg-secondary border border-border',
                  'transition-all duration-300',
                  'hover:border-accent/50',
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-text-primary">{skill.name}</span>
                  <span className="text-sm text-accent">{skill.level}%</span>
                </div>
                <div className="h-2 bg-tertiary rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      'bg-gradient-to-r from-accent to-accent-hover',
                      'transition-all duration-1000 ease-out',
                    )}
                    style={{
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
            <h3 className="text-xl font-semibold text-center mb-6">주로 사용하는 기술</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech, index) => (
                <div
                  key={tech.name}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full',
                    'bg-secondary border border-border',
                    'transition-all duration-300',
                    'hover:border-accent hover:scale-105',
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <span className="text-lg">{tech.icon}</span>
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Block */}
          <div className="max-w-2xl mx-auto rounded-lg overflow-hidden bg-tertiary border border-border">
            {/* Code Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-secondary border-b border-border">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-text-muted ml-2">developer.ts</span>
            </div>
            {/* Code Content */}
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              <code className="text-text-secondary">
                <span className="text-purple-400">const</span>{' '}
                <span className="text-blue-400">developer</span>{' '}
                <span className="text-text-primary">=</span> {'{'}
                {'\n'}
                {'  '}<span className="text-green-400">name</span>:{' '}
                <span className="text-yellow-400">"Hyun"</span>,{'\n'}
                {'  '}<span className="text-green-400">role</span>:{' '}
                <span className="text-yellow-400">"Frontend Developer"</span>,{'\n'}
                {'  '}<span className="text-green-400">skills</span>:{' '}
                [<span className="text-yellow-400">"React"</span>,{' '}
                <span className="text-yellow-400">"TypeScript"</span>,{' '}
                <span className="text-yellow-400">"Next.js"</span>],{'\n'}
                {'  '}<span className="text-green-400">passion</span>:{' '}
                <span className="text-yellow-400">"Creating beautiful UIs"</span>,{'\n'}
                {'\n'}
                {'  '}<span className="text-blue-400">code</span>:{' '}
                <span className="text-purple-400">() =&gt;</span>{' '}
                <span className="text-yellow-400">"Clean & Efficient"</span>,{'\n'}
                {'  '}<span className="text-blue-400">learn</span>:{' '}
                <span className="text-purple-400">() =&gt;</span>{' '}
                <span className="text-yellow-400">"Never Stop"</span>,{'\n'}
                {'  '}<span className="text-blue-400">coffee</span>:{' '}
                <span className="text-purple-400">() =&gt;</span>{' '}
                <span className="text-yellow-400">"Always ☕"</span>{'\n'}
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
