import LLMAgentDashboardIndex from "@/views/pages/projects/llm/LLMAgentDashboardIndex";
import { Route, Routes } from "react-router-dom";

/**
 *  1.  ProjectsRouters
 */

const ProjectsRouters = () => {


    return (
        <Routes>
            <Route index path="dashboard" element={<LLMAgentDashboardIndex />} />
            
        </Routes>
    )
}

export default ProjectsRouters;