/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GitHub Personal Access Token (classic) — read:user, public_repo 권한 */
  readonly VITE_GITHUB_TOKEN: string
  /** GitHub 유저명 (예: SeungHyun1207) */
  readonly VITE_GITHUB_USERNAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
