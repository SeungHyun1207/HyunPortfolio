export interface ExperienceItem {
  id: string
  type: 'work' | 'education'
  titleKey: string
  organizationKey: string
  periodKey: string
  descriptionKeys: string[]
  techStack?: string[]
}

export interface FestivalItem {
  nameKey: string
  orgKey: string
  yearKey: string
  descKey: string
}
