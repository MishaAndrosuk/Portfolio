import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import { GridLegacy as Grid } from '@mui/material';
import {
  Code,
  Web,
  Build,
  BugReport,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import type { SkillCard } from '../../types';

interface SkillsProps {}

type TabType = 'languages' | 'frameworks' | 'tools' | 'testing';

interface SkillTabData {
  id: TabType;
  label: string;
  icon: React.ReactElement;
  skills: SkillCard[];
}

const Skills: React.FC<SkillsProps> = () => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });
  const [activeTab, setActiveTab] = useState<TabType>('languages');
  const { t } = useTranslation();
  const theme = useTheme();

  const skillTabs: SkillTabData[] = [
    {
      id: 'languages',
      label: t('skills.categories.languages'),
      icon: <Code />,
      skills: [
        { title: 'JavaScript', level: 'expert' },
        { title: 'TypeScript', level: 'advanced' },
        { title: 'CSS3', level: 'expert' },
        { title: 'HTML5', level: 'expert' },
      ]
    },
    {
      id: 'frameworks',
      label: t('skills.categories.frameworks'),
      icon: <Web />,
      skills: [
        { title: 'React', level: 'expert' },
        { title: 'Vue.js', level: 'intermediate' },
        { title: 'Node.js', level: 'intermediate' },
        { title: 'Next.js', level: 'intermediate' },
      ]
    },
    {
      id: 'tools',
      label: t('skills.categories.tools'),
      icon: <Build />,
      skills: [
        { title: 'Git', level: 'expert' },
        { title: 'Webpack', level: 'advanced' },
        { title: 'VS Code', level: 'expert' },
        { title: 'Figma', level: 'advanced' },
      ]
    },
    {
      id: 'testing',
      label: t('skills.categories.testing'),
      icon: <BugReport />,
      skills: [
        { title: 'Jest', level: 'advanced' },
        { title: 'Cypress', level: 'intermediate' },
        { title: 'Testing Library', level: 'advanced' },
        { title: 'Playwright', level: 'intermediate' },
      ]
    }
  ];

  const getLevelColor = (level: SkillCard['level']) => {
    const colors = {
      beginner: theme.palette.grey[500],
      intermediate: theme.palette.warning.main,
      advanced: theme.palette.info.main,
      expert: theme.palette.success.main,
    };
    return colors[level];
  };

  const getLevelLabel = (level: SkillCard['level']) => {
    return t(`skills.levels.${level}`);
  };

  return (
    <Box
      id="skills"
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
            {t('skills.title')}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            {t('skills.subtitle')}
          </Typography>
        </Box>

        <Box
          sx={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 0.8s ease-out 0.3s',
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  minHeight: 60,
                  '&.Mui-selected': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              {skillTabs.map((tab) => (
                <Tab
                  key={tab.id}
                  value={tab.id}
                  label={tab.label}
                  icon={tab.icon}
                  iconPosition="start"
                  sx={{
                    '& .MuiSvgIcon-root': {
                      mr: 1,
                    },
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {skillTabs.map((tab) => (
            <Box
              key={tab.id}
              role="tabpanel"
              hidden={activeTab !== tab.id}
              sx={{
                opacity: activeTab === tab.id ? 1 : 0,
                transform: activeTab === tab.id ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease-out',
              }}
            >
              {activeTab === tab.id && (
                <Grid container spacing={3}>
                  {tab.skills.map((skill, index) => (
                    <Grid item xs={12} sm={6} md={3} key={skill.title}>
                      <Card
                        sx={{
                          height: '100%',
                          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.3)}`,
                          },
                          transition: 'all 0.3s ease',
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible
                            ? 'translateY(0)'
                            : 'translateY(30px)',
                          transitionDelay: `${index * 0.1}s`,
                        }}
                      >
                        <CardContent sx={{ textAlign: 'center', p: 3 }}>
                          <Box
                            sx={{
                              width: 60,
                              height: 60,
                              borderRadius: 2,
                              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mx: 'auto',
                              mb: 2,
                              color: 'white',
                            }}
                          >
                            {tab.icon}
                          </Box>

                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              mb: 1,
                              color: 'text.primary',
                            }}
                          >
                            {skill.title}
                          </Typography>

                          <Chip
                            label={getLevelLabel(skill.level)}
                            size="small"
                            sx={{
                              backgroundColor: getLevelColor(skill.level),
                              color: 'white',
                              fontWeight: 500,
                            }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Skills;