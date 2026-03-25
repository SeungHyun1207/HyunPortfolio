import type { ContributionDay } from '@services/githubService'

export interface WeekRow {
  days: (ContributionDay | null)[]
}
