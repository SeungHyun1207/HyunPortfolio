// ==============================
// 출퇴근 기록
// ==============================
export interface AttendanceRecord {
  date: string            // YYYY-MM-DD
  checkIn: string | null  // 'AM/PM HH:MM:SS' 포맷
  checkOut: string | null // 'AM/PM HH:MM:SS' 포맷
}

// ==============================
// 메일 아이템
// ==============================
export interface MailItem {
  id: string
  sender: string
  senderEmail: string
  title: string
  preview: string
  receivedAt: string   // 'YYYY.MM.DD HH:mm'
  isRead: boolean
  isImportant: boolean
}

// ==============================
// 휴가 아이템 (내 휴가)
// ==============================
export interface VacationItem {
  id: string
  type: string            // '연차', '반차', '병가'
  startDate: string       // 'YYYY.MM.DD'
  endDate: string
  status: 'approved' | 'pending' | 'rejected'
  reason: string
}

// ==============================
// 팀/전사 휴가 아이템
// ==============================
export interface TeamVacationItem {
  id: string
  employeeId: string
  employeeName: string
  department: string     // '개발팀', '기획팀', ...
  type: string           // '연차', '반차', '병가'
  startDate: string      // 'YYYY.MM.DD'
  endDate: string
  status: 'approved' | 'pending' | 'rejected'
}

// ==============================
// 휴가 잔여
// ==============================
export interface VacationBalance {
  totalDays: number
  usedDays: number
  remainDays: number
  remainHours: number
}

// ==============================
// 일정 아이템
// ==============================
export interface ScheduleItem {
  id: string
  title: string
  date: string          // 'YYYY.MM.DD'
  time?: string         // 'HH:mm'
  type: 'meeting' | 'deadline' | 'event' | 'personal'
}

// ==============================
// 결재 대기 아이템
// ==============================
export interface ApprovalItem {
  id: string
  title: string
  requester: string
  requestedAt: string
  type: string
}

// ==============================
// 알림 아이템
// ==============================
export interface NotificationItem {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  isRead: boolean
  createdAt: string    // 'YYYY.MM.DD HH:mm'
  link?: string
}

// ==============================
// 일정 카드 설정
// — 나중에 관리자가 ScheduleCardSetting.allowAllScope 를 false 로
//   설정하면 일반 직원은 소속팀만 볼 수 있음
// ==============================
export type VacationViewScope = 'team' | 'all'

export interface ScheduleCardSetting {
  /** 현재 선택된 휴가 조회 범위 */
  vacationScope: VacationViewScope
  /**
   * 전체 사원 보기 허용 여부 (관리자 설정)
   * — false 이면 UI에서 '전체' 탭 비활성화
   */
  allowAllScope: boolean
}

// ==============================
// WorkCard 종류 — ProfileCard 하단 요약 카드
// ==============================
export type WorkCardId = 'schedule' | 'attendance' | 'vacation' | 'mail' | 'approval'

export interface WorkCardSetting {
  id: WorkCardId
  label: string
  visible: boolean
  order: number
}
