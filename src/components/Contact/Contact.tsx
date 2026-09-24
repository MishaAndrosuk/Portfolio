import React from 'react';
import { Box, Typography, Button, Card, CardContent, Stack } from '@mui/material';
import { Email, Phone, Telegram, GitHub, LinkedIn, Download, ArrowOutward } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Section from '../common/Section';
import Reveal from '../common/Reveal';
import { CONTACTS, ASSETS } from '../../config/site';
import { motion } from '../../theme';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  const links = [
    {
      href: `mailto:${CONTACTS.email}`,
      icon: <Email fontSize="small" />,
      label: t('actions.email'),
      value: CONTACTS.email,
    },
    {
      href: `tel:${CONTACTS.phone}`,
      icon: <Phone fontSize="small" />,
      label: t('actions.phone'),
      value: CONTACTS.phoneDisplay,
    },
    {
      href: CONTACTS.telegram,
      icon: <Telegram fontSize="small" />,
      label: t('actions.telegram'),
      value: '@qwichsj',
    },
    {
      href: CONTACTS.github,
      icon: <GitHub fontSize="small" />,
      label: t('actions.github'),
      value: 'MishaAndrosuk',
    },
    ...(CONTACTS.linkedin
      ? [
          {
            href: CONTACTS.linkedin,
            icon: <LinkedIn fontSize="small" />,
            label: t('actions.linkedin'),
            value: t('actions.linkedin'),
          },
        ]
      : []),
  ];

  return (
    <Section
      id="contact"
      eyebrow={t('contact.eyebrow')}
      title={t('contact.title')}
      subtitle={t('contact.subtitle')}
      tone="alt"
    >
      <Reveal>
        <Card sx={{ mb: { xs: 3, md: 4 } }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Typography variant="h3" component="h3" sx={{ mb: 1.5 }}>
              {t('contact.headline')}
            </Typography>
            <Typography
              sx={{ color: 'var(--c-ink-muted)', maxWidth: 620, lineHeight: 1.8, mb: 3.5 }}
            >
              {t('contact.lead')}
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Email />}
                href={`mailto:${CONTACTS.email}`}
              >
                {t('actions.writeEmail')}
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
          </CardContent>
        </Card>
      </Reveal>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {links.map((link, i) => {
          const external = link.href.startsWith('http');
          return (
            <Reveal key={link.label} delay={i * 60}>
              <Box
                component="a"
                href={link.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2.25,
                  borderRadius: '14px',
                  border: '1px solid var(--c-border)',
                  backgroundColor: 'var(--c-surface)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: `border-color ${motion.base} ${motion.ease}, box-shadow ${motion.base} ${motion.ease}`,
                  '&:hover': {
                    borderColor: 'var(--c-accent)',
                    boxShadow: 'var(--c-shadow-sm)',
                  },
                  '&:hover .contact-arrow': { opacity: 1, transform: 'none' },
                }}
              >
                <Box
                  aria-hidden="true"
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    display: 'grid',
                    placeItems: 'center',
                    backgroundColor: 'var(--c-accent-soft)',
                    color: 'var(--c-accent)',
                    flexShrink: 0,
                  }}
                >
                  {link.icon}
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" sx={{ color: 'var(--c-ink-faint)' }}>
                    {link.label}
                  </Typography>
                  <Typography sx={{ fontWeight: 550, overflowWrap: 'anywhere' }}>
                    {link.value}
                  </Typography>
                </Box>
                <ArrowOutward
                  className="contact-arrow"
                  fontSize="small"
                  aria-hidden="true"
                  sx={{
                    ml: 'auto',
                    color: 'var(--c-accent)',
                    opacity: 0,
                    transform: 'translate(-4px, 4px)',
                    transition: `opacity ${motion.base} ${motion.ease}, transform ${motion.base} ${motion.ease}`,
                  }}
                />
              </Box>
            </Reveal>
          );
        })}
      </Box>
    </Section>
  );
};

export default Contact;
