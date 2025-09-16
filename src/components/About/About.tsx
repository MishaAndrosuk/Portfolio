import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  useTheme,
} from '@mui/material';
import { GridLegacy as Grid } from '@mui/material';
import { ArrowForward, Code, Timeline, Business } from '@mui/icons-material';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });
  const { scrollToElement } = useSmoothScroll();
  const theme = useTheme();

  const skills = ['JavaScript', 'TypeScript', 'React', 'Redux', 'HTML5', 'CSS3', 'GitHub'];
  const stats = [
    { number: 1, label: 'Рік досвіду', icon: <Timeline /> },
    { number: 7, label: 'Технологій', suffix: '+', icon: <Code /> },
    { number: 1, label: 'Компанія', icon: <Business /> },
  ];

  return (
    <Box
      id="about"
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
            Про мене
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Passion for creating exceptional digital experiences
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'all 0.8s ease-out 0.3s',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  mb: 3,
                  color: 'text.primary',
                }}
              >
                Мотивований та готовий до роботи Front-End розробник з твердим розумінням сучасних веб-технологій,
                включаючи HTML, CSS, JavaScript, React та TypeScript. Відкритий до вивчення нових інструментів та підходів,
                швидко адаптуюся до робочих процесів команди та завдань.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  mb: 4,
                  color: 'text.primary',
                }}
              >
                Прагну брати участь у реальних проєктах, розробляти нові компоненти та розвиватися як розробник,
                вирішуючи практичні завдання. Зосереджений на створенні корисних, доступних та зручних інтерфейсів,
                які справляють різницю.
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: 'text.primary',
                }}
              >
                Ключові компетенції
              </Typography>

              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 4 }}>
                {skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    variant="outlined"
                    sx={{
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </Stack>

              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={() => scrollToElement('contact')}
                sx={{
                  py: 1.5,
                  px: 3,
                  borderRadius: 3,
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                Написати мені
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box
              sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
                transition: 'all 0.8s ease-out 0.5s',
              }}
            >
              <Grid container spacing={2}>
                {stats.map((stat, index) => (
                  <Grid item xs={12} key={index}>
                    <Card
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}05)`,
                        border: `1px solid ${theme.palette.primary.main}20`,
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: `0 12px 40px ${theme.palette.primary.main}20`,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                        <Box sx={{ mb: 2, color: 'primary.main' }}>
                          {stat.icon}
                        </Box>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            color: 'primary.main',
                            mb: 1,
                          }}
                        >
                          {stat.number}{stat.suffix || ''}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 500,
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;