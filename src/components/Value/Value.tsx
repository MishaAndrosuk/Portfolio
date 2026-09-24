import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Section from '../common/Section';
import Reveal from '../common/Reveal';
import { motion } from '../../theme';

interface ValueItem {
  title: string;
  description: string;
}

/** «Чим я можу бути корисним команді» — коротко, мовою результату. */
const Value: React.FC = () => {
  const { t } = useTranslation();
  const items = t('value.items', { returnObjects: true }) as ValueItem[];

  return (
    <Section id="value" eyebrow={t('value.eyebrow')} title={t('value.title')}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: { xs: 3, md: 4 },
        }}
      >
        {items.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 70}
            sx={{
              pt: 3,
              borderTop: '2px solid var(--c-border)',
              transition: `border-color ${motion.base} ${motion.ease}`,
              '&:hover': { borderColor: 'var(--c-accent)' },
            }}
          >
            <Typography
              variant="overline"
              component="p"
              sx={{ color: 'var(--c-ink-faint)', mb: 1 }}
            >
              {String(i + 1).padStart(2, '0')}
            </Typography>
            <Typography variant="h4" component="h3" sx={{ mb: 1 }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--c-ink-muted)' }}>
              {item.description}
            </Typography>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
};

export default Value;
