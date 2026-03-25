import { create } from 'zustand'

export type UserRole = 'admin' | 'manager' | 'employee'
export type UserStatus = 'active' | 'inactive' | 'on-leave'
export type Department = '개발팀' | '기획팀' | '디자인팀' | '인사팀' | '영업팀'

export interface UserInfo {
  id: string
  name: string
  email: string
  role: UserRole
  department: Department
  position: string
  status: UserStatus
  joinedAt: string
  avatarUrl?: string
}

interface UserInfoState {
  currentUser: UserInfo | null
  users: UserInfo[]
  setCurrentUser: (user: UserInfo | null) => void
  setUsers: (users: UserInfo[]) => void
}

/** 샘플 직원 목록 */
const SAMPLE_USERS: UserInfo[] = [
  {
    id: 'u001',
    name: '김승현',
    email: 'seunghyun.kim@company.com',
    role: 'admin',
    department: '개발팀',
    position: '팀장',
    status: 'active',
    joinedAt: '2022-03-01',
  },
  {
    id: 'u002',
    name: '이지수',
    email: 'jisoo.lee@company.com',
    role: 'manager',
    department: '기획팀',
    position: '매니저',
    status: 'active',
    joinedAt: '2021-07-15',
  },
  {
    id: 'u003',
    name: '박민준',
    email: 'minjun.park@company.com',
    role: 'employee',
    department: '개발팀',
    position: '주임',
    status: 'active',
    joinedAt: '2023-01-10',
  },
  {
    id: 'u004',
    name: '최유나',
    email: 'yuna.choi@company.com',
    role: 'employee',
    department: '디자인팀',
    position: '사원',
    status: 'on-leave',
    joinedAt: '2023-06-01',
  },
  {
    id: 'u005',
    name: '정다은',
    email: 'daeun.jung@company.com',
    role: 'employee',
    department: '인사팀',
    position: '대리',
    status: 'active',
    joinedAt: '2020-11-20',
  },
]

const useUserInfo = create<UserInfoState>((set) => ({
  currentUser: SAMPLE_USERS[0],
  users: SAMPLE_USERS,
  setCurrentUser: (user) => set({ currentUser: user }),
  setUsers: (users) => set({ users }),
}))

export default useUserInfo
