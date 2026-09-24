import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Stack } from '@mui/material';
import { WorkOutline } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Section from '../common/Section';
import Reveal from '../common/Reveal';
import { EMPLOYMENT_PERIOD } from '../../config/site';
import { motion } from '../../theme';

const Experience: React.FC = () => {
  const { t } = useTranslation();

  const achievements = t('experience.current.achievements', {
    returnObjects: true,
  }) as string[];

  return (
    <Section
      id="experience"
      eyebrow={t('experience.eyebrow')}
      title={t('experience.title')}
      subtitle={t('experience.subtitle')}
      tone="alt"
    >
      <Box sx={{ maxWidth: 860 }}>
        <Reveal>
          <Card>
            <CardContent sx={{ p: { xs: 3, md: 4.5 } }}>
              {/* Шапка позиції */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                sx={{ mb: 1 }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    aria-hidden="true"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '12px',
                      display: 'grid',
                      placeItems: 'center',
                      backgroundColor: 'var(--c-accent-soft)',
                      color: 'var(--c-accent)',
                      flexShrink: 0,
                    }}
                  >
                    <WorkOutline fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="h3" component="h3">
                      {t('experience.current.role')}
                    </Typography>
                    <Typography sx={{ color: 'var(--c-accent)', fontWeight: 550 }}>
                      {t('experience.current.company')}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
                  <Chip size="small" variant="outlined" label={EMPLOYMENT_PERIOD} />
                  <Chip size="small" variant="outlined" label={t('experience.current.mode')} />
                </Stack>
              </Stack>

              <Typography sx={{ color: 'var(--c-ink-muted)', lineHeight: 1.8, mt: 2.5, mb: 3 }}>
                {t('experience.current.summary')}
              </Typography>

              <Typography variant="h4" component="h4" sx={{ mb: 2 }}>
                {t('experience.achievementsTitle')}
              </Typography>

              <Box
                component="ul"
                sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: 1 }}
              >
                {achievements.map((item, i) => (
                  <Box
                    key={i}
                    component="li"
                    sx={{
                      display: 'flex',
                      gap: 2,
                      alignItems: 'flex-start',
                      px: 1.5,
                      py: 1.25,
                      borderRadius: '12px',
                      border: '1px solid transparent',
                      transition: `background-color ${motion.fast} ${motion.ease}, border-color ${motion.fast} ${motion.ease}`,
                      '&:hover': {
                        backgroundColor: 'var(--c-surface-alt)',
                        borderColor: 'var(--c-border)',
                      },
                    }}
                  >
                    <Box
                      aria-hidden="true"
                      sx={{
                        width: 6,
                        height: 6,
                        mt: '9px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--c-accent)',
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="body2" sx={{ color: 'var(--c-ink-muted)' }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Reveal>
      </Box>
    </Section>
  );
};

export default Experience;
