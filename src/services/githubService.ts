import axios from 'axios'

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME as string

const githubClient = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
  },
})

// ─── 타입 ───────────────────────────────────────────────────────────────────

export interface ContributionDay {
  date: string
  contributionCount: number
}

export interface ContributionWeek {
  contributionDays: ContributionDay[]
}

export interface GithubContributionData {
  totalContributions: number
  weeks: ContributionWeek[]
}

export interface LangStat {
  lang: string
  color: string
  percent: number
  bytes: number
}

// ─── GraphQL 쿼리 ────────────────────────────────────────────────────────────

const CONTRIBUTION_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`

const LANGUAGE_QUERY = `
  query($username: String!) {
    user(login: $username) {
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          primaryLanguage {
            name
            color
          }
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`

// ─── API 함수 ────────────────────────────────────────────────────────────────

export const fetchContributions = async (): Promise<GithubContributionData> => {
  const to = new Date()
  const from = new Date()
  from.setFullYear(from.getFullYear() - 1)

  const response = await githubClient.post('/graphql', {
    query: CONTRIBUTION_QUERY,
    variables: {
      username: GITHUB_USERNAME,
      from: from.toISOString(),
      to: to.toISOString(),
    },
  })

  const calendar =
    response.data.data.user.contributionsCollection.contributionCalendar
  return {
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks,
  }
}

export const fetchLanguageStats = async (): Promise<LangStat[]> => {
  const response = await githubClient.post('/graphql', {
    query: LANGUAGE_QUERY,
    variables: { username: GITHUB_USERNAME },
  })

  const repos: { primaryLanguage: { name: string; color: string } | null; languages: { edges: { size: number; node: { name: string; color: string } }[] } }[] =
    response.data.data.user.repositories.nodes

  // 언어별 바이트 합산
  const langMap = new Map<string, { color: string; bytes: number }>()

  for (const repo of repos) {
    for (const edge of repo.languages?.edges ?? []) {
      const { name, color } = edge.node
      const prev = langMap.get(name)
      langMap.set(name, {
        color: color ?? '#ccc',
        bytes: (prev?.bytes ?? 0) + edge.size,
      })
    }
  }

  const total = Array.from(langMap.values()).reduce((s, v) => s + v.bytes, 0)
  if (total === 0) return []

  return Array.from(langMap.entries())
    .map(([lang, { color, bytes }]) => ({
      lang,
      color,
      bytes,
      percent: Math.round((bytes / total) * 100),
    }))
    .filter((l) => l.percent >= 1)
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 6)
}
