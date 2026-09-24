import React from 'react';
import { Box, Container, Typography, Button, Stack, IconButton, Tooltip } from '@mui/material';
import { Download, ArrowForward, GitHub, Telegram, Email, LinkedIn } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Reveal from '../common/Reveal';
import RoleRotator from '../common/RoleRotator';
import TiltPhoto from '../common/TiltPhoto';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { CONTACTS, ASSETS, YEARS_OF_EXPERIENCE } from '../../config/site';
import { motion } from '../../theme';

/** Hero над згином — поява має бути помітною, але швидкою. */
const FADE = motion.base;

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { scrollToElement } = useSmoothScroll();

  const roles = t('hero.roles', { returnObjects: true }) as string[];

  const socials = [
    { href: `mailto:${CONTACTS.email}`, icon: <Email />, label: t('actions.email') },
    { href: CONTACTS.github, icon: <GitHub />, label: t('actions.github') },
    { href: CONTACTS.telegram, icon: <Telegram />, label: t('actions.telegram') },
    ...(CONTACTS.linkedin
      ? [{ href: CONTACTS.linkedin, icon: <LinkedIn />, label: t('actions.linkedin') }]
      : []),
  ];

  const stats = [
    {
      value: `${YEARS_OF_EXPERIENCE}`,
      label: t('hero.stats.years', { count: YEARS_OF_EXPERIENCE }),
    },
    { value: 'React · TS', label: t('hero.stats.stack') },
    { value: 'Azure · AWS', label: t('hero.stats.cloud') },
  ];

  return (
    <Box
      id="hero"
      component="section"
      aria-labelledby="hero-heading"
      sx={{
        position: 'relative',
        pt: { xs: 13, md: 17 },
        pb: { xs: 5, md: 7 },
        overflow: 'hidden',
      }}
    >
      {/* Дуже мʼяка кольорова пляма замість градієнта на весь екран */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: '-18%',
          right: '-10%',
          width: { xs: 320, md: 620 },
          height: { xs: 320, md: 620 },
          borderRadius: '50%',
          background:
            'radial-gradient(circle, var(--c-accent-soft) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.15fr 0.85fr' },
            gap: { xs: 6, md: 8 },
            alignItems: 'center',
          }}
        >
          <Box>
            {/*
              Текст над згином рендериться одразу, без анімації появи:
              елемент під opacity:0 не зараховується як LCP, тож анімація
              відкладала метрику на весь свій час разом із завантаженням JS.
            */}
            <Typography variant="overline" component="p" sx={{ color: 'var(--c-accent)', mb: 2 }}>
              {CONTACTS.location}
            </Typography>

            <Typography id="hero-heading" variant="h1" component="h1" sx={{ mb: 1 }}>
              {t('hero.name')}
            </Typography>

            <Typography
              component="p"
              sx={{
                fontSize: 'clamp(1.15rem, 1rem + 1vw, 1.65rem)',
                fontWeight: 550,
                color: 'var(--c-ink)',
                minHeight: '1.6em',
                mb: 3,
              }}
            >
              <RoleRotator roles={roles} />
            </Typography>

            <Typography variant="subtitle1" sx={{ maxWidth: 560, mb: 4 }}>
              {t('hero.lead')}
            </Typography>

            <Reveal delay={0} duration={FADE} onMount>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => scrollToElement('contact')}
                >
                  {t('actions.contactMe')}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Download />}
                  href={ASSETS.cv}
                  download={ASSETS.cvFileName}
                >
                  {t('actions.downloadCV')}
                </Button>
              </Stack>
            </Reveal>

            <Reveal delay={60} duration={FADE} onMount>
              <Stack direction="row" spacing={0.5} sx={{ ml: -1, mb: { xs: 5, md: 6 } }}>
                {socials.map((s) => (
                  <Tooltip key={s.label} title={s.label}>
                    <IconButton
                      href={s.href}
                      aria-label={s.label}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      sx={{
                        color: 'var(--c-ink-muted)',
                        '&:hover': { color: 'var(--c-accent)', backgroundColor: 'var(--c-accent-soft)' },
                      }}
                    >
                      {s.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Stack>
            </Reveal>

            {/* Короткий «факт-рядок» для швидкого сканування рекрутером */}
            <Reveal delay={120} duration={FADE} onMount>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr 1fr 1fr' },
                  gap: { xs: 2, sm: 3 },
                  pt: 3,
                  borderTop: '1px solid var(--c-border)',
                  maxWidth: 520,
                }}
              >
                {stats.map((s) => (
                  <Box key={s.label}>
                    <Typography
                      component="p"
                      sx={{ fontWeight: 650, fontSize: '1.05rem', letterSpacing: '-0.01em' }}
                    >
                      {s.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--c-ink-faint)' }}>
                      {s.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Reveal>
          </Box>

          <Reveal from="right" delay={0} duration={FADE} onMount>
            <TiltPhoto alt={t('hero.photoAlt')} />
          </Reveal>
        </Box>
      </Container>

      {/* Ненавʼязлива підказка «гортай далі» */}
      <Box
        aria-hidden="true"
        sx={{
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'center',
          mt: 5,
        }}
      >
        <Box
          sx={{
            width: 1,
            height: 44,
            background: 'linear-gradient(to bottom, var(--c-border-strong), transparent)',
            animation: 'scrollHint 2.4s ease-in-out infinite',
            '@keyframes scrollHint': {
              '0%, 100%': { opacity: 0.35, transform: 'scaleY(0.7)' },
              '50%': { opacity: 1, transform: 'scaleY(1)' },
            },
            transformOrigin: 'top',
          }}
        />
      </Box>
    </Box>
  );
};

export default Hero;
