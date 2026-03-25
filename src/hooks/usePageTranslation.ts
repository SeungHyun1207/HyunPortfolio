import { useSettings } from '@/contexts/SettingsContext'

type Translations = {
  ko: Record<string, string>
  en: Record<string, string>
}

/**
 * 페이지별 독립 다국어 훅
 * 각 페이지의 *.i18n.ts 파일을 받아서 현재 언어에 맞는 번역을 반환합니다.
 *
 * @example
 * import { usePageTranslation } from '@hooks/usePageTranslation'
 * import { translations } from './myPage.i18n'
 *
 * const { t } = usePageTranslation(translations)
 * t('title') // 현재 언어에 맞는 번역 반환
 */
export const usePageTranslation = (translations: Translations) => {
  const { language } = useSettings()

  const t = (key: string): string => {
    return translations[language]?.[key] ?? translations['ko']?.[key] ?? key
  }

  return { t, language }
}
