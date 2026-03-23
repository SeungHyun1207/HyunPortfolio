import MainLayout from '@/views/layouts/MainLayout';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateProjectRouters from './views/routers/privateProject/PrivateProjectRouters';

/**
 * Lazy Loading 페이지 컴포넌트
 *
 * 코드 스플리팅으로 초기 로딩 최적화
 * 새 페이지 추가 예시:
 * const Projects = lazy(() => import('@views/Projects'))
 */
const Home = lazy(() => import('@/views'));

/**
 * 로딩 fallback 컴포넌트
 */
const PageLoader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', 
      height: '100vh',
      background: 'var(--color-bg-primary)',
    }}
  >
    <div
      style={{
        width: '40px',
        height: '40px',
        border: '3px solid var(--color-border)',
        borderTop: '3px solid var(--color-accent)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

/**
 * App 컴포넌트
 *
 * Suspense 자식 요소를 로드하기 전까지 화면에 대체 UI
 *                                     
 * 라우트 구조:
 * - "/" : MainLayout 적용
 *   - index : Home 페이지
 *   - "*" : 404 → Home으로 리다이렉트
 *
 * 새 라우트 추가 예시:
 * <Route path="projects" element={<Projects />} />
 * <Route path="projects/:id" element={<ProjectDetail />} />
 */
function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* MainLayout이 적용되는 라우트 그룹 */}
        <Route path="" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/privateProject/*' element={<PrivateProjectRouters />} />
        </Route>

        {/* 404 - 모든 미매칭 경로 */}
        <Route path="*" element={<MainLayout />}>
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
