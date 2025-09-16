import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  alpha,
} from '@mui/material';
import { GridLegacy as Grid } from '@mui/material';
import {
  Web,
  SportsBasketball,
  PhoneAndroid,
  Brush,
  GitHub,
  Sort,
} from '@mui/icons-material';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import type { Project, FilterType, SortType } from '../../types';
import { projectsData } from '../../data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = () => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('date');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();

  const filters: { value: FilterType; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'Всі', icon: null },
    { value: 'web', label: 'Web Apps', icon: <Web /> },
    { value: 'sport', label: 'Спорт', icon: <SportsBasketball /> },
    { value: 'mobile', label: 'Mobile', icon: <PhoneAndroid /> },
    { value: 'ui', label: 'UI/UX', icon: <Brush /> },
    { value: 'open-source', label: 'Open Source', icon: <GitHub /> },
  ];

  const sortOptions: { value: SortType; label: string }[] = [
    { value: 'date', label: 'За датою' },
    { value: 'name', label: 'За назвою' },
    { value: 'tech', label: 'За технологією' },
  ];

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projectsData;

    // Filter projects
    if (activeFilter !== 'all') {
      filtered = filtered.filter(project =>
        project.category.includes(activeFilter)
      );
    }

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.year - a.year;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'tech':
          return a.tech[0]?.localeCompare(b.tech[0] || '') || 0;
        default:
          return 0;
      }
    });

    return filtered;
  }, [activeFilter, sortBy]);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  const handleSortChange = (sort: SortType) => {
    setSortBy(sort);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <Box
        id="projects"
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
              Проєкти
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Портфоліо моїх останніх робіт
            </Typography>
          </Box>

          <Box
            sx={{
              mb: 6,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 0.8s ease-out 0.3s',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'stretch', md: 'center' },
                gap: 3,
                mb: 4,
              }}
            >
              <ToggleButtonGroup
                value={activeFilter}
                exclusive
                onChange={(_, newFilter) => newFilter && handleFilterChange(newFilter)}
                sx={{
                  flexWrap: 'wrap',
                  gap: 1,
                  '& .MuiToggleButton-root': {
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                    color: 'text.secondary',
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    },
                  },
                }}
              >
                {filters.map((filter) => (
                  <ToggleButton
                    key={filter.value}
                    value={filter.value}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                    }}
                  >
                    {filter.icon && <Box sx={{ mr: 1, display: 'flex' }}>{filter.icon}</Box>}
                    {filter.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>

              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Сортувати</InputLabel>
                <Select
                  value={sortBy}
                  label="Сортувати"
                  onChange={(e) => handleSortChange(e.target.value as SortType)}
                  startAdornment={<Sort sx={{ mr: 1, color: 'text.secondary' }} />}
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box
            sx={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 0.8s ease-out 0.5s',
            }}
          >
            {filteredAndSortedProjects.length > 0 ? (
              <Grid container spacing={4}>
                {filteredAndSortedProjects.map((project, index) => (
                  <Grid item xs={12} md={6} lg={4} key={project.id}>
                    <ProjectCard
                      project={project}
                      onClick={() => handleProjectClick(project)}
                      sx={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.6s ease-out',
                        transitionDelay: `${index * 0.1}s`,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  color: 'text.secondary',
                }}
              >
                <Typography variant="h4" sx={{ mb: 2, opacity: 0.7 }}>
                  🔍
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Проєктів не знайдено
                </Typography>
                <Typography variant="body1">
                  Спробуйте змінити фільтр або очистити пошук
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

export default Projects;