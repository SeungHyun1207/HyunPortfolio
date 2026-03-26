import { createTheme } from '@mui/material'

/**
 * 인트라넷 전용 MUI 테마 팩토리
 *
 * 포트폴리오 테마와 완전히 독립적으로 동작.
 * `useIntranetSettings().theme` 값으로 light/dark 선택.
 *
 * @example
 * const theme = createIntranetTheme('dark')
 * <ThemeProvider theme={theme}>...</ThemeProvider>
 */
export const createIntranetTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#818cf8' : '#6366f1',
      },
      ...(mode === 'light'
        ? {
            background: {
              default: '#f5f6fa',
              paper: '#ffffff',
            },
            text: {
              primary: '#1e293b',
              secondary: '#64748b',
              disabled: '#94a3b8',
            },
            divider: '#e2e8f0',
            action: {
              hover: '#f1f5f9',
              disabledBackground: '#e2e8f0',
            },
          }
        : {
            background: {
              default: '#0f172a',
              paper: '#1e293b',
            },
            text: {
              primary: '#f1f5f9',
              secondary: '#94a3b8',
              disabled: '#64748b',
            },
            divider: 'rgba(255,255,255,0.08)',
            action: {
              hover: 'rgba(255,255,255,0.05)',
              disabledBackground: 'rgba(255,255,255,0.08)',
            },
          }),
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      fontFamily: 'inherit',
    },
  })
