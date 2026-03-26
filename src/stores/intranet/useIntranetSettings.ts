import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ==============================
// 인트라넷 전용 설정 타입
// ==============================
interface IntranetSettingsState {
  /** 인트라넷 다크모드 — 포트폴리오 테마와 독립적으로 관리 */
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

// ==============================
// 인트라넷 전용 설정 스토어
// — localStorage에 persist (키: intranet-settings)
// ==============================
const useIntranetSettings = create<IntranetSettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'intranet-settings' },
  ),
)

export default useIntranetSettings
