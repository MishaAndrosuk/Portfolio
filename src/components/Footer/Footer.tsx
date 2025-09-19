import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Email,
  GitHub,
  Telegram,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const socialLinks = [
    {
      href: 'mailto:androsukmisa3@gmail.com',
      ariaLabel: 'Написати email',
      icon: <Email />
    },
    {
      href: 'https://github.com/MishaAndrosuk',
      ariaLabel: 'GitHub профіль',
      icon: <GitHub />
    },
    {
      href: 'https://t.me/qwichs',
      ariaLabel: 'Telegram',
      icon: <Telegram />
    }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      role="contentinfo"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                border: `2px solid ${theme.palette.primary.main}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderBottom: `8px solid ${theme.palette.primary.main}`,
                  transform: 'rotate(90deg)',
                }}
              />
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              © {currentYear} {t('hero.name')}. {t('footer.rights')}.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            {socialLinks.map((link, index) => (
              <IconButton
                key={index}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={link.ariaLabel}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {link.icon}
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;