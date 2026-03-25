import type { ReactNode } from 'react'

export interface ContactInfoItem {
  icon: ReactNode
  label: string
  value: string
  href: string | null
}
