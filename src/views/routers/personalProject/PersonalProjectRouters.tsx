import IntranetIndex from '@/views/pages/home/projects/personalProject/intranet/IntranetIndex'
import { Route, Routes } from 'react-router-dom'

/**
 * 개인 프로젝트 라우터
 *
 * - /personalProject/intranet : 사내관리시스템
 */
const PersonalProjectRouters = () => {
  return (
    <Routes>
      <Route path="intranet" element={<IntranetIndex />} />
    </Routes>
  )
}

export default PersonalProjectRouters
