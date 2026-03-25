import ProfileImg from '@assets/img/Profile.jpg';
import { usePageTranslation } from '@hooks/usePageTranslation';
import { translations } from './about.i18n';
import { useScrollAnimation } from '@hooks';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import { Box, Chip, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

const About = () => {
  const { t } = usePageTranslation(translations);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  // 현재 상태 정보 카드
  const statusCards = [
    { icon: <WorkIcon sx={{ fontSize: 16 }} />, label: t('status.company') },
    { icon: <CalendarTodayIcon sx={{ fontSize: 16 }} />, label: t('status.career') },
    { icon: <LocationOnIcon sx={{ fontSize: 16 }} />, label: t('status.location') },
    // { icon: <SearchIcon sx={{ fontSize: 16 }} />, label: t('status.seeking') },
  ];

  // 주력 기술
  const mainTechs = [
    { label: 'React', color: '#61DAFB', bg: 'rgba(97,218,251,0.12)' },
    { label: 'TypeScript', color: '#3178C6', bg: 'rgba(49,120,198,0.12)' },
    { label: 'Vite', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  ];

  // 주요 라이브러리
  const libraries = [
    { label: 'Zustand', color: '#ff6b35', bg: 'rgba(255,107,53,0.10)' },
    { label: 'React Query', color: '#ef4444', bg: 'rgba(239,68,68,0.10)' },
    { label: 'Axios', color: '#5a67d8', bg: 'rgba(90,103,216,0.10)' },
    { label: 'React Router', color: '#f59e0b', bg: 'rgba(245,158,11,0.10)' },
    { label: 'Day.js', color: '#10b981', bg: 'rgba(16,185,129,0.10)' },
    { label: 'MUI', color: '#007FFF', bg: 'rgba(0,127,255,0.10)' },
    { label: 'Tailwind CSS', color: '#38bdf8', bg: 'rgba(56,189,248,0.10)' },
  ];

  // 하이라이트 카드
  const highlights = [
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ width: 20, height: 20 }}
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ),
      titleKey: 'about.highlight1.title',
      descKey: 'about.highlight1.desc',
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ width: 20, height: 20 }}
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      titleKey: 'about.highlight2.title',
      descKey: 'about.highlight2.desc',
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ width: 20, height: 20 }}
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
        </svg>
      ),
      titleKey: 'about.highlight3.title',
      descKey: 'about.highlight3.desc',
    },
  ];

  return (
    <Box
      component="section"
      id="devinfo"
      ref={ref}
      sx={{ py: { xs: 10, md: 16 }, bgcolor: 'background.paper' }}
    >
      <Box sx={{ maxWidth: 1152, mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Grid
          container
          spacing={{ xs: 6, md: 8 }}
          alignItems="center"
          sx={{
            transition: 'all 0.7s ease',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          {/* Left - 프로필 이미지 + 현재 상태 */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                gap: 3,
              }}
            >
              {/* 프로필 이미지 */}
              <Box sx={{ position: 'relative' }}>
                <Paper
                  elevation={0}
                  sx={{
                    width: { xs: 180, md: 220 },
                    height: { xs: 180, md: 220 },
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                    bgcolor: 'background.default',
                  }}
                >
                  <Box
                    component="img"
                    src={ProfileImg}
                    alt="SeungHyun Profile"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </Paper>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -12,
                    right: -12,
                    width: '100%',
                    height: '100%',
                    borderRadius: 4,
                    border: '2px solid',
                    borderColor: 'primary.main',
                    opacity: 0.3,
                    zIndex: -1,
                  }}
                />
              </Box>

              {/* 현재 상태 카드 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, width: '100%' }}>
                {statusCards.map((card, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.2,
                      px: 1.8,
                      py: 1.2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      bgcolor: 'background.default',
                    }}
                  >
                    <Box sx={{ color: 'primary.main', display: 'flex', flexShrink: 0 }}>
                      {card.icon}
                    </Box>
                    <Typography variant="body2" fontWeight={500} sx={{ color: 'text.primary' }}>
                      {card.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right - 소개 텍스트 + 기술 + 하이라이트 */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              variant="overline"
              sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: '0.2em' }}
            >
              {t('label')}
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.75rem', md: '2rem', lg: '2.6rem' },
                fontWeight: 700,
                mt: 1,
                mb: 2.5,
                lineHeight: 1.25,
              }}
            >
              {t('title1')}
              <br />
              <Box component="span" className="gradient-text">
                {t('title2')}
              </Box>
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3.5 }}>
              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {t('description1')}
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {t('description2')}
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {t('description3')}
              </Typography>
            </Box>

            {/* 주력 기술 */}
            <Box sx={{ mb: 2.5 }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'block',
                  mb: 1.2,
                }}
              >
                {t('mainTech')}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {mainTechs.map((tech) => (
                  <Chip
                    key={tech.label}
                    label={tech.label}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      color: tech.color,
                      bgcolor: tech.bg,
                      border: `1px solid ${tech.color}40`,
                      '&:hover': { bgcolor: `${tech.color}20` },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* 주요 라이브러리 */}
            <Box sx={{ mb: 3.5 }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'block',
                  mb: 1.2,
                }}
              >
                {t('libraries')}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {libraries.map((lib) => (
                  <Chip
                    key={lib.label}
                    label={lib.label}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      color: lib.color,
                      bgcolor: lib.bg,
                      border: `1px solid ${lib.color}30`,
                      '&:hover': { bgcolor: `${lib.color}20` },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* 하이라이트 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              {highlights.map((item, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    px: 2,
                    py: 1.5,
                    borderRadius: 2.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.default',
                    transition: 'all 0.25s ease',
                    '&:hover': { borderColor: 'primary.main', transform: 'translateX(4px)' },
                  }}
                >
                  <Box
                    sx={{
                      p: 0.8,
                      borderRadius: 1.5,
                      bgcolor: 'primary.main',
                      color: '#fff',
                      flexShrink: 0,
                      display: 'flex',
                      opacity: 0.9,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.3 }}>
                      {t(item.titleKey)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {t(item.descKey)}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default About;
