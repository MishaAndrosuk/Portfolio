import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Reveal from './Reveal';

interface SectionProps {
  id: string;
  /** Малий моноширинний підпис над заголовком */
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Чергуємо тло, щоб секції візуально розділялися без жорстких меж */
  tone?: 'default' | 'alt';
  children: React.ReactNode;
}

/** Семантична секція зі спільними відступами й типографікою заголовка. */
const Section: React.FC<SectionProps> = ({
  id,
  eyebrow,
  title,
  subtitle,
  tone = 'default',
  children,
}) => (
  <Box
    id={id}
    component="section"
    aria-labelledby={`${id}-heading`}
    sx={{
      py: { xs: 9, md: 14 },
      backgroundColor: tone === 'alt' ? 'var(--c-surface-alt)' : 'var(--c-bg)',
      borderTop: tone === 'alt' ? '1px solid var(--c-border)' : 'none',
      borderBottom: tone === 'alt' ? '1px solid var(--c-border)' : 'none',
    }}
  >
    <Container maxWidth="lg">
      <Reveal sx={{ maxWidth: 680, mb: { xs: 5, md: 8 } }}>
        <Typography
          variant="overline"
          component="p"
          sx={{ color: 'var(--c-accent)', mb: 1.5 }}
        >
          {eyebrow}
        </Typography>
        <Typography id={`${id}-heading`} variant="h2" component="h2">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle1" sx={{ mt: 2, color: 'var(--c-ink-muted)' }}>
            {subtitle}
          </Typography>
        )}
      </Reveal>

      {children}
    </Container>
  </Box>
);

export default Section;
