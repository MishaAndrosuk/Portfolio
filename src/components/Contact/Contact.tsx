import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Email,
  Phone,
  Telegram,
  GitHub,
  LinkedIn,
  Download,
  ContentCopy,
  Check,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Section from '../common/Section';
import Reveal from '../common/Reveal';
import { useDeferredRender } from '../../hooks/useDeferredRender';
import { CONTACTS, ASSETS } from '../../config/site';
import { motion } from '../../theme';

// Форма тягне за собою поля вводу MUI — помітний шматок JS, який на першому
// рендері не потрібен: секція «Контакти» завжди нижче згину
const ContactForm = lazy(() => import('./ContactForm'));

/** Заглушка на час завантаження чанка: тримає висоту, щоб картка не стрибала. */
const FormPlaceholder: React.FC = () => (
  <Box aria-hidden="true" sx={{ display: 'grid', gap: 2.5 }}>
    {[56, 56, 132, 44].map((height, i) => (
      <Box
        key={i}
        sx={{
          height,
          borderRadius: '10px',
          backgroundColor: 'var(--c-subtle)',
          opacity: 0.6,
          ...(i === 3 && { width: 220 }),
        }}
      />
    ))}
  </Box>
);

/**
 * Кнопка копіювання адреси. Потрібна тому, що `mailto:` спрацьовує лише
 * там, де налаштований поштовий клієнт — у вебпошті клік не робить нічого.
 */
const CopyButton: React.FC<{ value: string; label: string; doneLabel: string }> = ({
  value,
  label,
  doneLabel,
}) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Буфер обміну недоступний (небезпечний контекст або заборона) — мовчки ігноруємо
    }
  };

  return (
    <Tooltip title={copied ? doneLabel : label}>
      <IconButton
        onClick={copy}
        aria-label={copied ? doneLabel : label}
        size="small"
        sx={{
          flexShrink: 0,
          color: copied ? 'var(--c-accent)' : 'var(--c-ink-faint)',
          '&:hover': { color: 'var(--c-accent)', backgroundColor: 'var(--c-accent-soft)' },
        }}
      >
        {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
};

const Contact: React.FC = () => {
  const { t } = useTranslation();
  // Чанк форми завантажується, коли секція наближається до екрана
  // (або щойно браузер звільниться — як страховка)
  const { ref: formSlotRef, shouldRender: showForm } = useDeferredRender<HTMLDivElement>();

  const links = [
    {
      href: `mailto:${CONTACTS.email}`,
      icon: <Email fontSize="small" />,
      label: t('actions.email'),
      value: CONTACTS.email,
      copy: CONTACTS.email,
    },
    {
      href: `tel:${CONTACTS.phone}`,
      icon: <Phone fontSize="small" />,
      label: t('actions.phone'),
      value: CONTACTS.phoneDisplay,
      copy: CONTACTS.phone,
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
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.25fr 0.75fr' },
          gap: { xs: 3, md: 4 },
          alignItems: 'start',
        }}
      >
        <Reveal>
          <Card>
            <CardContent sx={{ p: { xs: 3, md: 4.5 } }}>
              <Typography variant="h3" component="h3" sx={{ mb: 1.5 }}>
                {t('contact.headline')}
              </Typography>
              <Typography
                sx={{ color: 'var(--c-ink-muted)', maxWidth: 560, lineHeight: 1.8, mb: 4 }}
              >
                {t('contact.lead')}
              </Typography>

              <Box ref={formSlotRef}>
                {showForm ? (
                  <Suspense fallback={<FormPlaceholder />}>
                    <ContactForm />
                  </Suspense>
                ) : (
                  <FormPlaceholder />
                )}
              </Box>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal from="right" delay={100}>
          <Box sx={{ display: 'grid', gap: 1.5 }}>
            <Typography variant="overline" component="p" sx={{ color: 'var(--c-ink-faint)' }}>
              {t('contact.directTitle')}
            </Typography>

            {links.map((link) => {
              const external = link.href.startsWith('http');
              return (
                <Box
                  key={link.label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    pr: link.copy ? 1 : 0,
                    borderRadius: '14px',
                    border: '1px solid var(--c-border)',
                    backgroundColor: 'var(--c-surface)',
                    transition: `border-color ${motion.base} ${motion.ease}`,
                    '&:hover': { borderColor: 'var(--c-accent)' },
                  }}
                >
                  <Box
                    component="a"
                    href={link.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.75,
                      p: 2,
                      textDecoration: 'none',
                      color: 'inherit',
                      borderRadius: '14px',
                    }}
                  >
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
                  </Box>

                  {link.copy && (
                    <CopyButton
                      value={link.copy}
                      label={t('contact.copy')}
                      doneLabel={t('contact.copied')}
                    />
                  )}
                </Box>
              );
            })}

            <Button
              variant="outlined"
              size="large"
              startIcon={<Download />}
              href={ASSETS.cv}
              download={ASSETS.cvFileName}
              sx={{ mt: 1 }}
            >
              {t('actions.downloadCV')}
            </Button>
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
};

export default Contact;
