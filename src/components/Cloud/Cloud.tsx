import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Stack } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Section from '../common/Section';
import Reveal from '../common/Reveal';
import { motion } from '../../theme';

/** Платформи, з якими працюю. Списки сервісів — у locales. */
const PLATFORMS = ['azure', 'aws'] as const;

const Cloud: React.FC = () => {
  const { t } = useTranslation();

  const capabilities = t('cloud.capabilities', { returnObjects: true }) as string[];

  return (
    <Section
      id="cloud"
      eyebrow={t('cloud.eyebrow')}
      title={t('cloud.title')}
      subtitle={t('cloud.subtitle')}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: { xs: 2.5, md: 3 },
          mb: { xs: 4, md: 5 },
        }}
      >
        {PLATFORMS.map((key, i) => {
          const services = t(`cloud.platforms.${key}.services`, {
            returnObjects: true,
          }) as string[];

          return (
            <Reveal key={key} delay={i * 80}>
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: `border-color ${motion.base} ${motion.ease}, box-shadow ${motion.base} ${motion.ease}`,
                  '&:hover': {
                    borderColor: 'var(--c-border-strong)',
                    boxShadow: 'var(--c-shadow-md)',
                  },
                }}
              >
                {/* Тонка акцентна смуга зліва замість кольорової заливки картки */}
                <Box
                  aria-hidden="true"
                  sx={{
                    position: 'absolute',
                    insetBlock: 0,
                    left: 0,
                    width: 3,
                    backgroundColor: i === 0 ? 'var(--c-accent)' : 'var(--c-accent-alt)',
                  }}
                />
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography variant="h3" component="h3" sx={{ mb: 1 }}>
                    {t(`cloud.platforms.${key}.name`)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--c-ink-muted)', mb: 2.5 }}>
                    {t(`cloud.platforms.${key}.description`)}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {services.map((service) => (
                      <Chip
                        key={service}
                        label={service}
                        size="small"
                        variant="outlined"
                        sx={{ color: 'var(--c-ink)', borderColor: 'var(--c-border)' }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Reveal>
          );
        })}
      </Box>

      <Reveal delay={160}>
        <Card sx={{ backgroundColor: 'var(--c-surface-alt)' }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h4" component="h3" sx={{ mb: 2.5 }}>
              {t('cloud.capabilitiesTitle')}
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                m: 0,
                p: 0,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 1.5,
              }}
            >
              {capabilities.map((item) => (
                <Stack key={item} component="li" direction="row" spacing={1.5} alignItems="flex-start">
                  <CheckCircleOutline
                    fontSize="small"
                    sx={{ color: 'var(--c-accent)', mt: '2px', flexShrink: 0 }}
                    aria-hidden="true"
                  />
                  <Typography variant="body2" sx={{ color: 'var(--c-ink-muted)' }}>
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Reveal>
    </Section>
  );
};

export default Cloud;
