export type AlgoId = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick'
export type BarState = 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot'

export interface Bar {
  value: number
  state: BarState
}

export interface AlgoOption {
  id: AlgoId
  label: string
  color: string
  timeComplexity: string
  spaceComplexity: string
  description: string
}

export type Step = { arr: Bar[] }
