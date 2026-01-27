import type { ReactNode } from 'react'

/**
 * 공통 컴포넌트 Props
 */
export interface BaseComponentProps {
  /** 추가 클래스명 */
  className?: string
  /** 자식 요소 */
  children?: ReactNode
}

/**
 * 아이콘 컴포넌트 Props
 *
 * @example
 * const Icon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => (
 *   <svg width={size} height={size} fill={color}>...</svg>
 * )
 */
export interface IconProps {
  /** 아이콘 크기 (px) */
  size?: number
  /** 아이콘 색상 */
  color?: string
  /** 추가 클래스명 */
  className?: string
}

/**
 * 네비게이션 링크 타입
 */
export interface NavLink {
  /** 링크 레이블 */
  label: string
  /** 링크 경로 */
  href: string
  /** 외부 링크 여부 */
  external?: boolean
}

/**
 * 소셜 링크 타입
 */
export interface SocialLink {
  /** 플랫폼 이름 */
  name: string
  /** 링크 URL */
  url: string
  /** 아이콘 이름 */
  icon: string
}

/**
 * 프로젝트 타입
 */
export interface Project {
  /** 고유 ID */
  id: string
  /** 프로젝트 제목 */
  title: string
  /** 프로젝트 설명 */
  description: string
  /** 썸네일 이미지 경로 */
  thumbnail: string
  /** 사용 기술 스택 */
  techStack: string[]
  /** 라이브 데모 URL */
  demoUrl?: string
  /** GitHub 저장소 URL */
  githubUrl?: string
  /** 주요 특징 */
  features?: string[]
}

/**
 * 스킬 타입
 */
export interface Skill {
  /** 스킬 이름 */
  name: string
  /** 숙련도 (0-100) */
  level: number
  /** 카테고리 */
  category: 'frontend' | 'backend' | 'tools' | 'etc'
  /** 아이콘 */
  icon?: string
}
