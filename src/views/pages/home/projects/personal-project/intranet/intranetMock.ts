import type {
  ApprovalItem,
  MailItem,
  NotificationItem,
  ScheduleItem,
  TeamVacationItem,
  VacationBalance,
  VacationItem,
} from '@models/personal-project/intranet/IntranetModel'

// ==============================
// 메일 목 데이터 (5개)
// ==============================
export const MOCK_MAILS: MailItem[] = [
  {
    id: 'm001',
    sender: '이지수',
    senderEmail: 'jisoo.lee@company.com',
    title: '[공지] 3월 정기 회의 일정 안내',
    preview: '안녕하세요. 3월 정기 회의 일정을 안내드립니다. 참석 부탁드립니다.',
    receivedAt: '2026.03.26 09:30',
    isRead: false,
    isImportant: true,
  },
  {
    id: 'm002',
    sender: '박민준',
    senderEmail: 'minjun.park@company.com',
    title: 'Re: 프로젝트 진행 현황 보고',
    preview: '안녕하세요. 프로젝트 진행 현황 보고 드립니다. 현재 80% 완료 상태입니다.',
    receivedAt: '2026.03.25 14:15',
    isRead: false,
    isImportant: false,
  },
  {
    id: 'm003',
    sender: '정다은',
    senderEmail: 'daeun.jung@company.com',
    title: '연차 사용 안내',
    preview: '연차 사용과 관련하여 안내 드립니다. 올해 잔여 연차를 확인해 주세요.',
    receivedAt: '2026.03.24 11:00',
    isRead: true,
    isImportant: false,
  },
  {
    id: 'm004',
    sender: '최유나',
    senderEmail: 'yuna.choi@company.com',
    title: '[디자인팀] UI 리뉴얼 시안 공유',
    preview: '이번 UI 리뉴얼 시안을 공유드립니다. 피드백 부탁드립니다.',
    receivedAt: '2026.03.23 16:45',
    isRead: false,
    isImportant: true,
  },
  {
    id: 'm005',
    sender: '시스템 관리자',
    senderEmail: 'admin@company.com',
    title: '[보안] 비밀번호 변경 권고 안내',
    preview: '정보 보안을 위해 주기적인 비밀번호 변경을 권고드립니다.',
    receivedAt: '2026.03.22 08:00',
    isRead: true,
    isImportant: false,
  },
]

// ==============================
// 휴가 목 데이터 (3개)
// ==============================
export const MOCK_VACATIONS: VacationItem[] = [
  {
    id: 'v001',
    type: '연차',
    startDate: '2026.03.10',
    endDate: '2026.03.11',
    status: 'approved',
    reason: '개인 사정',
  },
  {
    id: 'v002',
    type: '반차',
    startDate: '2026.03.28',
    endDate: '2026.03.28',
    status: 'pending',
    reason: '병원 방문',
  },
  {
    id: 'v003',
    type: '병가',
    startDate: '2026.02.20',
    endDate: '2026.02.21',
    status: 'rejected',
    reason: '독감',
  },
]

// ==============================
// 휴가 잔여 목 데이터
// ==============================
export const MOCK_VACATION_BALANCE: VacationBalance = {
  totalDays: 15,
  usedDays: 5,
  remainDays: 10,
  remainHours: 4,
}

// ==============================
// 일정 목 데이터 (4개, 오늘 포함)
// ==============================
export const MOCK_SCHEDULES: ScheduleItem[] = [
  {
    id: 's001',
    title: '개발팀 주간 회의',
    date: '2026.03.26',
    time: '10:00',
    type: 'meeting',
  },
  {
    id: 's002',
    title: '프로젝트 마감일',
    date: '2026.03.31',
    time: '18:00',
    type: 'deadline',
  },
  {
    id: 's003',
    title: '신입 환영회',
    date: '2026.04.02',
    time: '18:30',
    type: 'event',
  },
  {
    id: 's004',
    title: '치과 예약',
    date: '2026.04.05',
    time: '13:00',
    type: 'personal',
  },
]

// ==============================
// 결재 대기 목 데이터 (2개)
// ==============================
export const MOCK_APPROVALS: ApprovalItem[] = [
  {
    id: 'a001',
    title: '출장비 지급 신청',
    requester: '박민준',
    requestedAt: '2026.03.25',
    type: '지출',
  },
  {
    id: 'a002',
    title: '장비 구매 요청',
    requester: '최유나',
    requestedAt: '2026.03.24',
    type: '구매',
  },
]

// ==============================
// 알림 목 데이터 (5개)
// ==============================
export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n001',
    title: '결재 요청',
    message: '박민준님이 출장비 지급 신청 결재를 요청했습니다.',
    type: 'info',
    isRead: false,
    createdAt: '2026.03.26 09:15',
  },
  {
    id: 'n002',
    title: '휴가 승인 완료',
    message: '3월 10일 연차 신청이 승인되었습니다.',
    type: 'success',
    isRead: false,
    createdAt: '2026.03.25 16:30',
  },
  {
    id: 'n003',
    title: '일정 알림',
    message: '오늘 10:00 개발팀 주간 회의가 예정되어 있습니다.',
    type: 'warning',
    isRead: false,
    createdAt: '2026.03.26 09:00',
  },
  {
    id: 'n004',
    title: '시스템 공지',
    message: '3월 28일(금) 오후 10시 시스템 점검이 예정되어 있습니다.',
    type: 'info',
    isRead: true,
    createdAt: '2026.03.24 14:00',
  },
  {
    id: 'n005',
    title: '반차 반려',
    message: '3월 28일 반차 신청이 반려되었습니다. 사유를 확인해 주세요.',
    type: 'error',
    isRead: true,
    createdAt: '2026.03.23 11:20',
  },
]

// ==============================
// 팀 · 전사 휴가 목 데이터
// ==============================
export const MOCK_TEAM_VACATIONS: TeamVacationItem[] = [
  // 개발팀
  {
    id: 'tv001',
    employeeId: 'u003',
    employeeName: '박민준',
    department: '개발팀',
    type: '연차',
    startDate: '2026.03.27',
    endDate: '2026.03.28',
    status: 'approved',
  },
  {
    id: 'tv002',
    employeeId: 'u001',
    employeeName: '강승현',
    department: '개발팀',
    type: '반차',
    startDate: '2026.03.28',
    endDate: '2026.03.28',
    status: 'pending',
  },
  // 기획팀
  {
    id: 'tv003',
    employeeId: 'u002',
    employeeName: '이지수',
    department: '기획팀',
    type: '연차',
    startDate: '2026.04.01',
    endDate: '2026.04.02',
    status: 'approved',
  },
  // 디자인팀
  {
    id: 'tv004',
    employeeId: 'u004',
    employeeName: '최유나',
    department: '디자인팀',
    type: '병가',
    startDate: '2026.03.25',
    endDate: '2026.03.29',
    status: 'approved',
  },
  // 인사팀
  {
    id: 'tv005',
    employeeId: 'u005',
    employeeName: '정다은',
    department: '인사팀',
    type: '연차',
    startDate: '2026.04.03',
    endDate: '2026.04.04',
    status: 'pending',
  },
]
