import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
} from '@mui/material';
import { GridLegacy as Grid } from '@mui/material';
import {
  Email,
  Phone,
  Telegram,
  GitHub,
} from '@mui/icons-material';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });
  const theme = useTheme();

  const contactLinks = [
    {
      href: 'mailto:androsukmisa3@gmail.com',
      icon: <Email />,
      text: 'androsukmisa3@gmail.com',
      label: 'Email'
    },
    {
      href: 'tel:+380681263042',
      icon: <Phone />,
      text: '+38 (068) 126-30-42',
      label: 'Телефон'
    },
    {
      href: 'https://t.me/qwichsj',
      icon: <Telegram />,
      text: 'Telegram',
      label: 'Telegram'
    },
    {
      href: 'https://github.com/MishaAndrosuk',
      icon: <GitHub />,
      text: 'GitHub',
      label: 'GitHub'
    }
  ];

  return (
    <Box
      id="contact"
      ref={elementRef}
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            textAlign: 'center',
            mb: 8,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              mb: 2,
              color: 'text.primary',
            }}
          >
            Контакти
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Зв'яжіться зі мною
          </Typography>
        </Box>

        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            <Box
              sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: 'all 0.8s ease-out 0.3s',
              }}
            >
              <Card
                sx={{
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <CardContent sx={{ p: 5 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: 'text.primary',
                      textAlign: 'center',
                    }}
                  >
                    Зв'язатися зі мною
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      mb: 6,
                      lineHeight: 1.8,
                      color: 'text.secondary',
                      textAlign: 'center',
                      fontSize: '1.1rem',
                    }}
                  >
                    Готовий обговорити нові можливості співпраці, цікаві проєкти або просто поспілкуватися
                    про фронтенд розробку, нові технології та веб-розробку. Буду радий почути від вас і
                    обговорити можливості для спільної роботи над цікавими завданнями!
                  </Typography>

                  <List sx={{ p: 0 }}>
                    {contactLinks.map((link, index) => (
                      <ListItem
                        key={index}
                        component="a"
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        sx={{
                          p: 3,
                          mb: 2,
                          borderRadius: 3,
                          textDecoration: 'none',
                          color: 'inherit',
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            transform: 'translateX(12px)',
                            boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
                            borderColor: alpha(theme.palette.primary.main, 0.3),
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: 'primary.main',
                            minWidth: 56,
                            '& svg': {
                              fontSize: '1.8rem',
                            },
                          }}
                        >
                          {link.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={link.text}
                          secondary={link.label}
                          primaryTypographyProps={{
                            fontWeight: 600,
                            color: 'text.primary',
                            fontSize: '1.1rem',
                          }}
                          secondaryTypographyProps={{
                            color: 'text.secondary',
                            fontSize: '0.95rem',
                            fontWeight: 500,
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;