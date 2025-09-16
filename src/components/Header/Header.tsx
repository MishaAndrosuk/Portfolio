import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  IconButton,
  Box,
  Typography,
  useScrollTrigger,
  Slide,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Download,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import type { NavigationItem } from '../../types';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { scrollToElement } = useSmoothScroll();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const navigationItems: NavigationItem[] = [
    { href: 'about', label: 'Про мене' },
    { href: 'skills', label: 'Навички' },
    { href: 'projects', label: 'Проєкти' },
    { href: 'experience', label: 'Досвід' },
    { href: 'contact', label: 'Контакти' },
  ];

  const handleNavClick = (href: string) => {
    scrollToElement(href);
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="fixed"
        elevation={trigger ? 4 : 0}
        sx={{
          backgroundColor: trigger ? 'background.paper' : 'transparent',
          backdropFilter: trigger ? 'blur(10px)' : 'none',
          transition: 'all 0.3s ease-in-out',
          width: '100%',
          left: 0,
          right: 0,
          zIndex: 1200,
          '& .MuiToolbar-root': {
            width: '100%',
            margin: 0,
            padding: 0,
          }
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              py: 1,
              px: { xs: 1, sm: 2 },
              minHeight: { xs: 56, sm: 64 },
              width: '100%',
              overflow: 'hidden'
            }}
          >
            {/* Logo */}
            <Button
              onClick={() => handleNavClick('hero')}
              sx={{
                p: 0,
                minWidth: 'auto',
                '&:hover': { backgroundColor: 'transparent' }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  component="svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <rect
                    x="2"
                    y="2"
                    width="28"
                    height="28"
                    rx="6"
                    stroke="primary.main"
                    strokeWidth="2"
                  />
                  <path d="M12 20V12L20 16L12 20Z" fill="primary.main"/>
                </Box>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  Portfolio
                </Typography>
              </Box>
            </Button>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  sx={{
                    color: 'text.primary',
                    fontWeight: 500,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Actions */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.5, sm: 1 },
              flexShrink: 0,
              zIndex: 1000
            }}>
              <IconButton
                onClick={toggleTheme}
                aria-label="Перемкнути тему"
                sx={{
                  color: 'text.primary',
                  minWidth: { xs: 40, sm: 48 },
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  p: { xs: 1, sm: 1.5 },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}
              >
                {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>

              <Button
                href="/assets/Resume.pdf"
                download
                variant="contained"
                startIcon={<Download />}
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  borderRadius: 2,
                  fontSize: { sm: '0.875rem', md: '1rem' },
                }}
              >
                Завантажити CV
              </Button>

              {/* Mobile Menu */}
              <IconButton
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  color: 'text.primary',
                  minWidth: { xs: 40, sm: 48 },
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  p: { xs: 1, sm: 1.5 },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}
                onClick={handleMobileMenuOpen}
                aria-label="Відкрити мобільне меню"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Mobile Menu Dropdown */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMobileMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                sx: {
                  mt: 1,
                  minWidth: 200,
                  maxWidth: 280,
                  borderRadius: 2,
                  boxShadow: 3,
                  '& .MuiMenuItem-root': {
                    px: 2,
                    py: 1.5,
                    borderRadius: 1,
                    mx: 1,
                    mb: 0.5,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    }
                  }
                }
              }}
            >
              {navigationItems.map((item) => (
                <MenuItem
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.label}
                </MenuItem>
              ))}
              <MenuItem
                component="a"
                href="/assets/Resume.pdf"
                download
                onClick={handleMobileMenuClose}
              >
                <Download sx={{ mr: 1 }} />
                Завантажити CV
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
};

export default Header;