export type LangId =
  | 'typescript'
  | 'javascript'
  | 'react'
  | 'css'
  | 'python'
  | 'html'
  | 'bash'
  | 'sql'
  | 'other'

export interface Snippet {
  id: string
  title: string
  language: LangId
  code: string
  tags: string[]
  createdAt: string
}

export type ModalMode = 'add' | 'edit'

export interface FormState {
  title: string
  language: LangId
  code: string
  tags: string
}
