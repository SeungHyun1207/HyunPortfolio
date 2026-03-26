import useUserInfo from '@/stores/common/useUserInfo'
import { AlignCenter, CenterBox, FlexBox } from '@/views/layouts/CommonLayoutComponents'
import {
  Apps as AppsIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  Error as ErrorIcon,
  EventNote as EventNoteIcon,
  Info as InfoIcon,
  Inbox as InboxIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Warning as WarningIcon,
  WorkOff as WorkOffIcon,
} from '@mui/icons-material'
import {
  Avatar,
  Badge,
  Box,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  styled,
  Tooltip,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { MOCK_NOTIFICATIONS } from '../intranet/intranetMock'
import type { NotificationItem } from '@models/personalProject/intranet/IntranetModel'

// ==============================
// 전체 메뉴 아이템
// ==============================
const MENU_ITEMS = [
  { icon: <DashboardIcon />, label: '메인 대시보드' },
  { icon: <InboxIcon />,     label: '메일함'       },
  { icon: <WorkOffIcon />,   label: '휴가 관리'    },
  { icon: <EventNoteIcon />, label: '일정 관리'    },
  { icon: <AppsIcon />,      label: '결재'         },
]

const ADMIN_MENU_ITEMS = [
  { icon: <ManageAccountsIcon />, label: '인사 관리'   },
  { icon: <SettingsIcon />,       label: '시스템 설정' },
]

// ==============================
// 알림 타입별 아이콘 & 색상
// ==============================
const NOTIF_META: Record<NotificationItem['type'], { icon: React.ReactNode; color: string }> = {
  info:    { icon: <InfoIcon fontSize="small" />,         color: '#3b82f6' },
  success: { icon: <CheckCircleIcon fontSize="small" />,  color: '#22c55e' },
  warning: { icon: <WarningIcon fontSize="small" />,      color: '#f97316' },
  error:   { icon: <ErrorIcon fontSize="small" />,        color: '#ef4444' },
}

// ==============================
// IntranetGNB 컴포넌트
// ==============================
const IntranetGNB = () => {
  const { currentUser } = useUserInfo()

  // ── 전체 메뉴 Drawer ──
  const [menuOpen, setMenuOpen] = useState(false)

  // ── 알림 Popover ──
  const [notifAnchor, setNotifAnchor] = useState<HTMLButtonElement | null>(null)
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)

  const unreadCount  = notifications.filter((n) => !n.isRead).length
  const notifOpen    = Boolean(notifAnchor)

  const handleNotifOpen  = (e: React.MouseEvent<HTMLButtonElement>) => setNotifAnchor(e.currentTarget)
  const handleNotifClose = () => setNotifAnchor(null)

  /** 단건 읽음 처리 */
  const markAsRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))

  /** 전체 읽음 처리 */
  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))

  const initial = currentUser?.name?.charAt(0) ?? '?'

  return (
    <>
      <GNBWrap>
        {/* ── 좌측: 대시보드 로고 ── */}
        <LeftSection>
          <LogoIcon>🏢</LogoIcon>
          <LogoText>사내관리시스템</LogoText>
        </LeftSection>

        {/* ── 중앙: 회사 로고 ── */}
        <CenterSection>
          <CompanyLogo>(주)제타소프트</CompanyLogo>
        </CenterSection>

        {/* ── 우측: 알림 / 전체메뉴 / 프로필 ── */}
        <RightSection>
          {/* 알림 */}
          <Tooltip title="알림" arrow>
            <IconButton size="small" onClick={handleNotifOpen}>
              <Badge badgeContent={unreadCount} color="error" max={99}>
                <NotificationsIcon sx={{ fontSize: '22px', color: 'text.secondary' }} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* 전체 메뉴 */}
          <Tooltip title="전체메뉴" arrow>
            <IconButton size="small" onClick={() => setMenuOpen(true)}>
              <MenuIcon sx={{ fontSize: '22px', color: 'text.secondary' }} />
            </IconButton>
          </Tooltip>

          {/* 프로필 아바타 */}
          <Tooltip title={`${currentUser?.name} ${currentUser?.position}`} arrow>
            <ProfileAvatar>{initial}</ProfileAvatar>
          </Tooltip>
        </RightSection>
      </GNBWrap>

      {/* ── 알림 Popover ── */}
      <Popover
        open={notifOpen}
        anchorEl={notifAnchor}
        onClose={handleNotifClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { mt: 1, borderRadius: '12px', width: 340, overflow: 'hidden' } } }}
      >
        {/* Popover 헤더 */}
        <NotifHeader>
          <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>
            알림
            {unreadCount > 0 && (
              <Chip
                label={`${unreadCount}건`}
                size="small"
                color="error"
                sx={{ ml: 1, height: 18, fontSize: '11px' }}
              />
            )}
          </Typography>
          {unreadCount > 0 && (
            <Typography
              onClick={markAllRead}
              sx={{ fontSize: '12px', color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            >
              전체 읽음
            </Typography>
          )}
        </NotifHeader>

        <Divider />

        {/* 알림 목록 */}
        <NotifList>
          {notifications.map((notif) => {
            const meta = NOTIF_META[notif.type]
            return (
              <NotifItem
                key={notif.id}
                isRead={notif.isRead}
                onClick={() => markAsRead(notif.id)}
              >
                {/* 타입 아이콘 */}
                <Box sx={{ color: meta.color, flexShrink: 0, mt: '2px' }}>{meta.icon}</Box>

                {/* 내용 */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '2px' }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: notif.isRead ? 500 : 700 }}>
                      {notif.title}
                    </Typography>
                    <Typography sx={{ fontSize: '11px', color: 'text.disabled', flexShrink: 0, ml: 1 }}>
                      {notif.createdAt.split(' ')[1]}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: 'text.secondary',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {notif.message}
                  </Typography>
                </Box>

                {/* 미읽음 닷 */}
                {!notif.isRead && <UnreadDot />}
              </NotifItem>
            )
          })}
        </NotifList>
      </Popover>

      {/* ── 전체메뉴 Drawer ── */}
      <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <DrawerWrap>
          <DrawerHeader>
            <Typography sx={{ fontSize: '16px', fontWeight: 700, color: 'text.primary' }}>전체 메뉴</Typography>
            <IconButton size="small" onClick={() => setMenuOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </DrawerHeader>

          <Divider />

          <MenuSection>
            <MenuSectionTitle>메인</MenuSectionTitle>
            <List disablePadding>
              {MENU_ITEMS.map((item) => (
                <ListItemButton key={item.label} sx={{ borderRadius: '8px', mb: '2px' }}>
                  <ListItemIcon sx={{ minWidth: '36px', color: 'primary.main' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: '14px', fontWeight: 500, color: 'text.primary' }}
                  />
                </ListItemButton>
              ))}
            </List>
          </MenuSection>

          <Divider />

          {(currentUser?.role === 'admin' || currentUser?.role === 'manager') && (
            <MenuSection>
              <MenuSectionTitle>관리자</MenuSectionTitle>
              <List disablePadding>
                {ADMIN_MENU_ITEMS.map((item) => (
                  <ListItemButton key={item.label} sx={{ borderRadius: '8px', mb: '2px' }}>
                    <ListItemIcon sx={{ minWidth: '36px', color: 'secondary.main' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontSize: '14px', fontWeight: 500, color: 'text.primary' }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </MenuSection>
          )}

          <Box sx={{ mt: 'auto' }}>
            <Divider />
            <DrawerProfileBox>
              <ProfileAvatar sx={{ width: 36, height: 36, fontSize: '14px' }}>
                {initial}
              </ProfileAvatar>
              <Box>
                <Typography sx={{ fontSize: '14px', fontWeight: 700, color: 'text.primary' }}>
                  {currentUser?.name}
                </Typography>
                <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>
                  {currentUser?.department} · {currentUser?.position}
                </Typography>
              </Box>
            </DrawerProfileBox>
          </Box>
        </DrawerWrap>
      </Drawer>
    </>
  )
}

export default IntranetGNB

// ==============================
// Styled 컴포넌트
// ==============================

const GNBWrap = styled(AlignCenter)(({ theme }) => ({
  width: '100%',
  height: '56px',
  padding: '0 24px',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  boxSizing: 'border-box',
}))

const LeftSection  = styled(AlignCenter)({ gap: '8px', flex: 1 })
const CenterSection = styled(CenterBox)({ flex: 1 })
const RightSection = styled(AlignCenter)({ flex: 1, justifyContent: 'flex-end', gap: '4px' })

const LogoIcon = styled(Typography)({ fontSize: '22px', lineHeight: 1 })

const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: '15px',
  fontWeight: 800,
  color: theme.palette.primary.main,
  letterSpacing: '-0.3px',
}))

const CompanyLogo = styled(Typography)(({ theme }) => ({
  fontSize: '15px',
  fontWeight: 700,
  color: theme.palette.text.primary,
  letterSpacing: '-0.3px',
}))

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  fontSize: '13px',
  fontWeight: 700,
  cursor: 'pointer',
  backgroundColor: theme.palette.primary.main,
}))

/* ── 알림 Popover ── */
const NotifHeader = styled(AlignCenter)(({ theme }) => ({
  padding: '14px 16px 12px',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper,
}))

const NotifList = styled(FlexBox)(({ theme }) => ({
  flexDirection: 'column',
  maxHeight: '360px',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
}))

const NotifItem = styled(AlignCenter, {
  shouldForwardProp: (p) => p !== 'isRead',
})<{ isRead: boolean }>(({ theme, isRead }) => ({
  padding: '12px 16px',
  gap: '10px',
  alignItems: 'flex-start',
  cursor: 'pointer',
  backgroundColor: isRead ? 'transparent' : theme.palette.action.hover,
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: 'background-color 0.15s',
  '&:hover': { backgroundColor: theme.palette.action.hover },
  '&:last-child': { borderBottom: 'none' },
}))

const UnreadDot = styled(Box)({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: '#3b82f6',
  flexShrink: 0,
  alignSelf: 'flex-start',
  marginTop: '4px',
})

/* ── 전체 메뉴 Drawer ── */
const DrawerWrap = styled(FlexBox)(({ theme }) => ({
  width: '260px',
  height: '100%',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}))

const DrawerHeader = styled(AlignCenter)({
  justifyContent: 'space-between',
  padding: '16px 16px 12px',
})

const MenuSection = styled(Box)({ padding: '12px 8px 4px' })

const MenuSectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '11px',
  fontWeight: 700,
  color: theme.palette.text.disabled,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '0 8px 6px',
}))

const DrawerProfileBox = styled(AlignCenter)({ gap: '10px', padding: '16px' })
