import React from 'react';
import { Box, Container, Typography, IconButton, Stack, Tooltip } from '@mui/material';
import { Email, GitHub, Telegram, LinkedIn } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { CONTACTS } from '../../config/site';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const socials = [
    { href: `mailto:${CONTACTS.email}`, label: t('actions.email'), icon: <Email fontSize="small" /> },
    { href: CONTACTS.github, label: t('actions.github'), icon: <GitHub fontSize="small" /> },
    { href: CONTACTS.telegram, label: t('actions.telegram'), icon: <Telegram fontSize="small" /> },
    ...(CONTACTS.linkedin
      ? [{ href: CONTACTS.linkedin, label: t('actions.linkedin'), icon: <LinkedIn fontSize="small" /> }]
      : []),
  ];

  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid var(--c-border)',
        backgroundColor: 'var(--c-bg)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" sx={{ color: 'var(--c-ink-faint)', textAlign: 'center' }}>
            © {new Date().getFullYear()} {CONTACTS.name}. {t('footer.rights')}
          </Typography>

          <Stack direction="row" spacing={0.5}>
            {socials.map((s) => (
              <Tooltip key={s.label} title={s.label}>
                <IconButton
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  size="small"
                  sx={{
                    color: 'var(--c-ink-faint)',
                    '&:hover': { color: 'var(--c-accent)', backgroundColor: 'var(--c-accent-soft)' },
                  }}
                >
                  {s.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
