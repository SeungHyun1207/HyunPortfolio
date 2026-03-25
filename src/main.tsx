import App from '@/App';
import { SettingsProvider, useSettings } from '@/contexts/SettingsContext';
import { createAppTheme } from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import '@styles/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

/**
 * MUI 테마를 SettingsContext의 theme 상태와 동기화하는 래퍼 컴포넌트
 */
const MUIThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useSettings();
  const muiTheme = createAppTheme(theme);
  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <BrowserRouter>
          <MUIThemeWrapper>
            <App />
          </MUIThemeWrapper>
        </BrowserRouter>
      </SettingsProvider>
    </QueryClientProvider>
  </StrictMode>,
);
