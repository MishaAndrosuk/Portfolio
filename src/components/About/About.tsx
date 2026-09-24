import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Divider } from '@mui/material';
import { School, Translate, Place } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Section from '../common/Section';
import Reveal from '../common/Reveal';
import { CONTACTS } from '../../config/site';

const About: React.FC = () => {
  const { t } = useTranslation();

  const paragraphs = t('about.paragraphs', { returnObjects: true }) as string[];
  const languages = t('about.languages', { returnObjects: true }) as string[];

  const facts = [
    {
      icon: <School fontSize="small" />,
      title: t('about.education.degree'),
      lines: [t('about.education.school'), t('about.education.period')],
    },
    {
      icon: <Translate fontSize="small" />,
      title: t('about.languagesTitle'),
      lines: languages,
    },
    {
      icon: <Place fontSize="small" />,
      title: t('about.locationTitle'),
      lines: [CONTACTS.location, t('about.remote')],
    },
  ];

  return (
    <Section
      id="about"
      eyebrow={t('about.eyebrow')}
      title={t('about.title')}
      subtitle={t('about.subtitle')}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' },
          gap: { xs: 5, md: 8 },
          alignItems: 'start',
        }}
      >
        <Box>
          {paragraphs.map((text, i) => (
            <Reveal key={i} delay={i * 80}>
              <Typography
                sx={{
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'var(--c-ink-muted)',
                  mb: 2.5,
                  '& strong': { color: 'var(--c-ink)', fontWeight: 600 },
                }}
              >
                {text}
              </Typography>
            </Reveal>
          ))}
        </Box>

        <Reveal from="right" delay={120}>
          <Card>
            <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
              <Stack divider={<Divider sx={{ borderColor: 'var(--c-border)' }} />} spacing={2.5}>
                {facts.map((fact) => (
                  <Box key={fact.title} sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      aria-hidden="true"
                      sx={{
                        flexShrink: 0,
                        width: 34,
                        height: 34,
                        borderRadius: '10px',
                        display: 'grid',
                        placeItems: 'center',
                        backgroundColor: 'var(--c-accent-soft)',
                        color: 'var(--c-accent)',
                      }}
                    >
                      {fact.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 600, mb: 0.25 }}>{fact.title}</Typography>
                      {fact.lines.map((line) => (
                        <Typography
                          key={line}
                          variant="body2"
                          sx={{ color: 'var(--c-ink-muted)' }}
                        >
                          {line}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Reveal>
      </Box>
    </Section>
  );
};

export default About;
