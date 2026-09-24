import React, { lazy, Suspense, useEffect, useState } from 'react';
import { AppBar, Toolbar, Container, Button, IconButton, Box, Tooltip } from '@mui/material';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Download,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { useActiveSection } from '../../hooks/useActiveSection';
import LanguageSwitcher from '../LanguageSwitcher';
import { SECTION_IDS, OBSERVED_SECTION_IDS, ASSETS, CONTACTS } from '../../config/site';
import { motion } from '../../theme';

const MobileNav = lazy(() => import('./MobileNav'));

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // Після першого відкриття тримаємо меню змонтованим, щоб анімація закриття відпрацювала
  const [menuLoaded, setMenuLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { scrollToElement, scrollToTop } = useSmoothScroll();
  const { t } = useTranslation();
  const activeSection = useActiveSection(OBSERVED_SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    scrollToElement(id);
    setMenuOpen(false);
  };

  return (
    <AppBar
      component="header"
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: scrolled ? 'var(--c-surface)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px) saturate(140%)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--c-border)' : 'transparent'}`,
        color: 'var(--c-ink)',
        transition: `background-color ${motion.base} ${motion.ease}, border-color ${motion.base} ${motion.ease}`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 60, md: 68 }, gap: 1 }}>
          {/* Логотип / до початку */}
          <Button
            onClick={scrollToTop}
            sx={{
              px: 1,
              ml: -1,
              fontWeight: 650,
              letterSpacing: '-0.02em',
              fontSize: '1rem',
              color: 'var(--c-ink)',
            }}
          >
            {CONTACTS.name}
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          {/* Десктопна навігація */}
          <Box component="nav" aria-label={t('nav.label')} sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
            {SECTION_IDS.map((id) => {
              const active = activeSection === id;
              return (
                <Button
                  key={id}
                  onClick={() => go(id)}
                  aria-current={active ? 'true' : undefined}
                  sx={{
                    position: 'relative',
                    px: 1.5,
                    fontWeight: 500,
                    color: active ? 'var(--c-ink)' : 'var(--c-ink-muted)',
                    '&:hover': { color: 'var(--c-ink)', backgroundColor: 'transparent' },
                    // Підкреслення «виростає» під активним пунктом
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: 12,
                      right: 12,
                      bottom: 6,
                      height: 2,
                      borderRadius: 2,
                      backgroundColor: 'var(--c-accent)',
                      transform: active ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'center',
                      transition: `transform ${motion.base} ${motion.ease}`,
                    },
                  }}
                >
                  {t(`nav.${id}`)}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: { md: 2 } }}>
            <LanguageSwitcher />

            <Tooltip title={t('actions.toggleTheme')}>
              <IconButton
                onClick={toggleTheme}
                aria-label={t('actions.toggleTheme')}
                sx={{ color: 'var(--c-ink-muted)', '&:hover': { color: 'var(--c-ink)' } }}
              >
                {theme === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
              </IconButton>
            </Tooltip>

            <Button
              href={ASSETS.cv}
              download={ASSETS.cvFileName}
              variant="contained"
              size="small"
              startIcon={<Download />}
              sx={{ display: { xs: 'none', sm: 'inline-flex' }, ml: 0.5 }}
            >
              {t('actions.cv')}
            </Button>

            <IconButton
              sx={{ display: { md: 'none' }, color: 'var(--c-ink)' }}
              onClick={() => {
                setMenuLoaded(true);
                setMenuOpen(true);
              }}
              aria-label={t('actions.openMenu')}
              aria-expanded={menuOpen}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Меню вантажиться окремим чанком при першому відкритті */}
      {menuLoaded && (
        <Suspense fallback={null}>
          <MobileNav
            open={menuOpen}
            activeSection={activeSection}
            onClose={() => setMenuOpen(false)}
            onNavigate={go}
          />
        </Suspense>
      )}
    </AppBar>
  );
};

export default Header;
