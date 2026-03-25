import LLMAgentDashboardIndex from '@/views/pages/home/projects/vibeProject/llm/LLMAgentDashboardIndex';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';

const ProjectLayout = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        type="button"
        onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}
        style={{
          position: 'fixed',
          top: 17,
          left: 20,
          zIndex: 1200 /* MUI AppBar(1100) 위 */,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          height: 30,
          padding: '0 12px',
          background: 'transparent',
          border: '1px solid #253545',
          borderRadius: 6,
          color: '#7ca4c4',
          fontSize: 11,
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 600,
          cursor: 'pointer',
          letterSpacing: '0.04em',
          transition: 'border-color 0.15s, color 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#00c8ff';
          e.currentTarget.style.color = '#00c8ff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#253545';
          e.currentTarget.style.color = '#7ca4c4';
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        뒤로가기
      </button>
      <Outlet />
    </>
  );
};

const ProjectsRouters = () => {
  return (
    <Routes>
      <Route element={<ProjectLayout />}>
        <Route index path="dashboard" element={<LLMAgentDashboardIndex />} />
      </Route>
    </Routes>
  );
};

export default ProjectsRouters;
