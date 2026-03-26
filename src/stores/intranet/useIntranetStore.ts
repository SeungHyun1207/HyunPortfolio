import { create } from 'zustand'
import type {
  AttendanceRecord,
  WorkCardId,
  WorkCardSetting,
} from '@models/personalProject/intranet/IntranetModel'

// ==============================
// 현재 시각을 'AM/PM HH:MM:SS' 포맷으로 변환
// ==============================
const formatTime = (): string => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  const period = hours < 12 ? 'AM' : 'PM'
  const displayHours = hours % 12 === 0 ? 12 : hours % 12
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${period} ${pad(displayHours)}:${pad(minutes)}:${pad(seconds)}`
}

// ==============================
// 오늘 날짜 'YYYY-MM-DD' 포맷
// ==============================
const getTodayDate = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// ==============================
// 초기 WorkCard 설정
// ==============================
const INITIAL_WORK_CARD_SETTINGS: WorkCardSetting[] = [
  { id: 'schedule', label: '일정', visible: true, order: 0 },
  { id: 'attendance', label: '출근시각', visible: true, order: 1 },
  { id: 'vacation', label: '휴가', visible: true, order: 2 },
  { id: 'mail', label: '안 읽은 메일', visible: true, order: 3 },
  { id: 'approval', label: '결재 대기', visible: true, order: 4 },
]

// ==============================
// Zustand Store 인터페이스
// ==============================
interface IntranetState {
  attendance: AttendanceRecord
  workCardSettings: WorkCardSetting[]
  checkIn: () => void
  checkOut: () => void
  toggleCardVisible: (id: WorkCardId) => void
  moveCardOrder: (id: WorkCardId, direction: 'up' | 'down') => void
}

// ==============================
// useIntranetStore
// ==============================
const useIntranetStore = create<IntranetState>((set) => ({
  // 초기 출퇴근 상태
  attendance: {
    date: getTodayDate(),
    checkIn: null,
    checkOut: null,
  },

  // 초기 WorkCard 설정
  workCardSettings: INITIAL_WORK_CARD_SETTINGS,

  // 출근하기: 현재 시각 저장
  checkIn: () =>
    set((state) => ({
      attendance: {
        ...state.attendance,
        checkIn: formatTime(),
      },
    })),

  // 퇴근하기: 현재 시각 저장
  checkOut: () =>
    set((state) => ({
      attendance: {
        ...state.attendance,
        checkOut: formatTime(),
      },
    })),

  // 카드 표시 여부 토글
  toggleCardVisible: (id: WorkCardId) =>
    set((state) => ({
      workCardSettings: state.workCardSettings.map((card) =>
        card.id === id ? { ...card, visible: !card.visible } : card
      ),
    })),

  // 카드 순서 변경 (위/아래)
  moveCardOrder: (id: WorkCardId, direction: 'up' | 'down') =>
    set((state) => {
      const sorted = [...state.workCardSettings].sort((a, b) => a.order - b.order)
      const index = sorted.findIndex((card) => card.id === id)

      if (direction === 'up' && index === 0) return state
      if (direction === 'down' && index === sorted.length - 1) return state

      const swapIndex = direction === 'up' ? index - 1 : index + 1
      const newSettings = sorted.map((card) => {
        if (card.id === sorted[index].id) {
          return { ...card, order: sorted[swapIndex].order }
        }
        if (card.id === sorted[swapIndex].id) {
          return { ...card, order: sorted[index].order }
        }
        return card
      })

      return { workCardSettings: newSettings }
    }),
}))

export default useIntranetStore
