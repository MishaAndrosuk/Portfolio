import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  Stack,
  useTheme,
} from '@mui/material';
import { GridLegacy as Grid } from '@mui/material';
import { Download, ArrowForward } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });
  const { scrollToElement } = useSmoothScroll();
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      id="hero"
      ref={elementRef}
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 10, md: 12 },
        pb: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}10 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: 'all 0.8s ease-out',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: 'text.secondary',
                  mb: 2,
                  fontWeight: 500,
                }}
              >
                {t('hero.greeting')}
              </Typography>

              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  fontWeight: 800,
                  mb: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.2,
                }}
              >
                {t('hero.name')}
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  lineHeight: 1.6,
                  maxWidth: 600,
                }}
              >
                {t('hero.title')}
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mt: 4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => scrollToElement('projects')}
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: 3,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 12px 35px ${theme.palette.primary.main}50`,
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {t('buttons.viewProjects')}
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Download />}
                  href="/assets/Resume.pdf"
                  download
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: 3,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {t('buttons.downloadCV')}
                </Button>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
                transition: 'all 0.8s ease-out 0.3s',
              }}
            >
              {/* Decorative elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  left: -20,
                  width: 120,
                  height: 120,
                  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}30, ${theme.palette.secondary.main}30)`,
                  animation: 'float 6s ease-in-out infinite',
                  zIndex: 0,
                }}
              />

              <Avatar
                src="/assets/images/avatar.jpg"
                alt={t('hero.name')}
                sx={{
                  width: { xs: 280, sm: 320, md: 380 },
                  height: { xs: 280, sm: 320, md: 380 },
                  border: `4px solid ${theme.palette.background.paper}`,
                  boxShadow: `0 20px 60px ${theme.palette.primary.main}30`,
                  position: 'relative',
                  zIndex: 1,
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  bottom: -30,
                  right: -30,
                  width: 100,
                  height: 100,
                  borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
                  background: `linear-gradient(45deg, ${theme.palette.secondary.main}30, ${theme.palette.primary.main}30)`,
                  animation: 'float 6s ease-in-out infinite reverse',
                  zIndex: 0,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Global keyframes for animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default Hero;