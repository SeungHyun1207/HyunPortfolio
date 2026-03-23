import { Outlet } from 'react-router-dom'
import GNB from './GNB'
import Settings from './Settings'
import { Box } from '@mui/material'
import Footer from './Footer'

const MainLayout = () => {
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <GNB />
      <Settings />

      <Box component="main" sx={{ flex: 1, pt: '64px' }}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  )
}

export default MainLayout
