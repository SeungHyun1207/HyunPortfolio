import LLMAgentDashboardIndex from "@/views/pages/projects/llm/LLMAgentDashboardIndex";
import AlgoVisualizerIndex     from "@/views/pages/privateProject/algo/AlgoVisualizerIndex";
import GitHubHeatmapIndex      from "@/views/pages/privateProject/githeatmap/GitHubHeatmapIndex";
import CodeSnippetIndex        from "@/views/pages/privateProject/snippet/CodeSnippetIndex";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";

/**
 * 개인 프로젝트 공통 레이아웃 — 좌상단 고정 뒤로가기 버튼
 */
const PrivateProjectLayout = () => {
    const navigate = useNavigate();
    return (
        <>
            <button
                type="button"
                onClick={() => navigate("/")}
                style={{
                    position: "fixed",
                    top: 17,          /* GNB h-16(64px) 수직 중앙: (64 - 30) / 2 = 17 */
                    left: 20,
                    zIndex: 50,       /* GNB z-40 위 */
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    height: 30,
                    padding: "0 12px",
                    background: "transparent",
                    border: "1px solid #253545",
                    borderRadius: 6,
                    color: "#7ca4c4",
                    fontSize: 11,
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 600,
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    transition: "border-color 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#00c8ff";
                    e.currentTarget.style.color = "#00c8ff";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#253545";
                    e.currentTarget.style.color = "#7ca4c4";
                }}
            >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                뒤로가기
            </button>
            <Outlet />
        </>
    );
};

/**
 * PrivateProjectRouters
 * 개인 프로젝트 라우터
 *
 * 경로 구조:
 * - /privateProject/aiagent    : AI Agent 대시보드
 * - /privateProject/algo       : Algorithm Visualizer
 * - /privateProject/githeatmap : GitHub Heatmap
 * - /privateProject/snippet    : Code Snippet Manager
 */
const PrivateProjectRouters = () => {
    return (
        <Routes>
            <Route element={<PrivateProjectLayout />}>
                <Route path="aiagent"    element={<LLMAgentDashboardIndex />} />
                <Route path="algo"       element={<AlgoVisualizerIndex />} />
                <Route path="githeatmap" element={<GitHubHeatmapIndex />} />
                <Route path="snippet"    element={<CodeSnippetIndex />} />
            </Route>
        </Routes>
    );
};

export default PrivateProjectRouters;
