/**
 *  공통 Footer
 */

import { useSettings } from "@/contexts/SettingsContext";
import { Box, Divider, styled, Typography } from "@mui/material";

const Footer = () => {

    const { t } = useSettings()

    return (
        <FooterWrap>
          <Box sx={{ maxWidth: 1152, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
            <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
            >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, gap: 0.5 }}>
              <Typography className="gradient-text" sx={{ fontSize: '1.25rem', fontWeight: 700 }}>
                SeungHyun
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {t('footer.role')}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Typography
                component="a"
                href="https://github.com/SeungHyun1207"
                target="_blank"
                rel="noopener noreferrer"
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.3s ease',
                }}
              >
                GitHub
              </Typography>
              <Typography
                component="a"
                href="mailto:seunghyun_1207@naver.com"
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.3s ease',
                }}
              >
                Email
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="caption" color="text.secondary" display="block" textAlign="center">
            &copy; {new Date().getFullYear()} SeungHyun. {t('footer.rights')}
          </Typography>
        </Box>
        </FooterWrap>
    )

}


export default Footer;


const FooterWrap = styled("footer")({
    borderTop : '1px solid',
    borderColor : 'divider',
    bgcolor : 'background.paper',
})

