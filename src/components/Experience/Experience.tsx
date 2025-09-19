import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  useTheme,
  alpha,
} from '@mui/material';
import { Work, School, Code } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import type { TimelineItem } from '../../types';

interface ExperienceProps {}

const Experience: React.FC<ExperienceProps> = () => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });
  const { t } = useTranslation();
  const theme = useTheme();

  const timelineData: TimelineItem[] = [
    {
      id: 1,
      title: t('experience.jobs.metaart.title'),
      company: t('experience.jobs.metaart.company'),
      date: '02/2025 - 09/2025',
      description: t('experience.jobs.metaart.description'),
      achievements: t('experience.jobs.metaart.achievements', { returnObjects: true }) as string[],
      type: 'work'
    }
  ];

  const getIcon = (type: TimelineItem['type']) => {
    switch (type) {
      case 'work':
        return <Work />;
      case 'education':
        return <School />;
      case 'project':
        return <Code />;
      default:
        return <Work />;
    }
  };

  return (
    <Box
      id="experience"
      ref={elementRef}
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.paper',
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
            {t('experience.title')}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            {t('experience.subtitle')}
          </Typography>
        </Box>

        <Box
          sx={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 0.8s ease-out 0.3s',
            maxWidth: 800,
            mx: 'auto',
          }}
        >
          {timelineData.map((item, index) => (
            <Box
              key={item.id}
              sx={{
                position: 'relative',
                mb: 4,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: { xs: 20, md: 40 },
                  top: 0,
                  bottom: index === timelineData.length - 1 ? '50%' : 0,
                  width: '2px',
                  background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.3)})`,
                  zIndex: 0,
                },
              }}
            >
              {/* Timeline Dot */}
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: 8, md: 28 },
                  top: 30,
                  width: { xs: 24, md: 24 },
                  height: { xs: 24, md: 24 },
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
                  zIndex: 1,
                  border: '3px solid',
                  borderColor: 'background.paper',
                }}
              >
                {getIcon(item.type)}
              </Box>

              {/* Content Card */}
              <Card
                sx={{
                  ml: { xs: 6, md: 8 },
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)}, ${alpha(theme.palette.secondary.main, 0.04)})`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                  borderRadius: 3,
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 16px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                  },
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  }
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 }, pl: { xs: 4, md: 5 } }}>
                  {/* Header */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                        mb: 1,
                        fontSize: { xs: '1.3rem', md: '1.5rem' },
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 0.5, sm: 2 }, alignItems: { xs: 'flex-start', sm: 'center' } }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'primary.main',
                          fontWeight: 600,
                          fontSize: { xs: '1.1rem', md: '1.25rem' },
                        }}
                      >
                        {item.company}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontWeight: 500,
                          px: { xs: 0, sm: 2 },
                          py: { xs: 0, sm: 0.5 },
                          borderRadius: 1,
                          bgcolor: { xs: 'transparent', sm: alpha(theme.palette.primary.main, 0.1) },
                          fontSize: '0.9rem',
                        }}
                      >
                        {item.date}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      lineHeight: 1.7,
                      color: 'text.primary',
                      fontSize: '1rem',
                    }}
                  >
                    {item.description}
                  </Typography>

                  {/* Achievements */}
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: 'text.primary',
                        fontSize: '1.1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                        }}
                      />
                      {t('experience.keyAchievements')}
                    </Typography>

                    <Box
                      component="ul"
                      sx={{
                        listStyle: 'none',
                        p: 0,
                        m: 0,
                        display: 'grid',
                        gap: 1.5,
                      }}
                    >
                      {item.achievements.map((achievement, achievementIndex) => (
                        <Box
                          component="li"
                          key={achievementIndex}
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: alpha(theme.palette.background.paper, 0.6),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                              borderColor: alpha(theme.palette.primary.main, 0.2),
                            }
                          }}
                        >
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: 'primary.main',
                              flexShrink: 0,
                              mt: 0.75,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.primary',
                              fontSize: '0.95rem',
                              lineHeight: 1.6,
                            }}
                          >
                            {achievement}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Experience;