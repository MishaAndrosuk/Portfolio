import React from 'react';
import { Box, Typography, Card, CardContent, Chip } from '@mui/material';
import { Code, Dns, CloudQueue, Handyman } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Section from '../common/Section';
import Reveal from '../common/Reveal';
import { motion } from '../../theme';

/** Категорії навичок. Списки — у locales, щоб їх було легко правити й перекладати. */
const GROUPS = [
  { key: 'frontend', icon: <Code fontSize="small" /> },
  { key: 'backend', icon: <Dns fontSize="small" /> },
  { key: 'cloud', icon: <CloudQueue fontSize="small" /> },
  { key: 'tools', icon: <Handyman fontSize="small" /> },
] as const;

const Skills: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Section
      id="skills"
      eyebrow={t('skills.eyebrow')}
      title={t('skills.title')}
      subtitle={t('skills.subtitle')}
      tone="alt"
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: { xs: 2.5, md: 3 },
        }}
      >
        {GROUPS.map((group, i) => {
          const items = t(`skills.groups.${group.key}.items`, {
            returnObjects: true,
          }) as string[];

          return (
            <Reveal key={group.key} delay={i * 70}>
              <Card
                sx={{
                  height: '100%',
                  transition: `border-color ${motion.base} ${motion.ease}, box-shadow ${motion.base} ${motion.ease}, transform ${motion.base} ${motion.ease}`,
                  '&:hover': {
                    borderColor: 'var(--c-border-strong)',
                    boxShadow: 'var(--c-shadow-md)',
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                    <Box
                      aria-hidden="true"
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: '10px',
                        display: 'grid',
                        placeItems: 'center',
                        backgroundColor: 'var(--c-accent-soft)',
                        color: 'var(--c-accent)',
                      }}
                    >
                      {group.icon}
                    </Box>
                    <Typography variant="h3" component="h3" sx={{ fontSize: '1.15rem' }}>
                      {t(`skills.groups.${group.key}.title`)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {items.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        variant="outlined"
                        size="small"
                        sx={{
                          backgroundColor: 'var(--c-bg)',
                          color: 'var(--c-ink)',
                          borderColor: 'var(--c-border)',
                          transition: `background-color ${motion.fast} ${motion.ease}, border-color ${motion.fast} ${motion.ease}`,
                          '&:hover': {
                            backgroundColor: 'var(--c-accent-soft)',
                            borderColor: 'var(--c-accent)',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Reveal>
          );
        })}
      </Box>
    </Section>
  );
};

export default Skills;
