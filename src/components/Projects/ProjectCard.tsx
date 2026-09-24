import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Button,
  Box,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { Launch, Code, Star } from '@mui/icons-material';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  sx?: SxProps<Theme>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, sx }) => {
  const theme = useTheme();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Відкрити деталі проєкту ${project.title}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 16px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
        },
        '&:focus': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
        ...sx,
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="250"
          image={project.image}
          alt={`${project.title} проєкт скріншот`}
          sx={{
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />

        {/* Overlay with action buttons */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            opacity: 0,
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 1,
            },
          }}
          className="project-overlay"
        >
          {project.demoUrl && (
            <Button
              variant="contained"
              size="small"
              startIcon={<Launch />}
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              sx={{
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Demo
            </Button>
          )}
          {project.repoUrl && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<Code />}
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: alpha('#ffffff', 0.1),
                },
              }}
            >
              Code
            </Button>
          )}
        </Box>

        {/* Featured badge */}
        {project.featured && (
          <Chip
            icon={<Star />}
            label="Рекомендований"
            color="secondary"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              fontWeight: 600,
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 1,
          }}
        >
          {project.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {project.tech.slice(0, 3).map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              variant="outlined"
              sx={{
                fontSize: '0.75rem',
                height: 24,
              }}
            />
          ))}
          {project.tech.length > 3 && (
            <Chip
              label={`+${project.tech.length - 3}`}
              size="small"
              variant="outlined"
              sx={{
                fontSize: '0.75rem',
                height: 24,
                color: 'text.secondary',
              }}
            />
          )}
        </Stack>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: 'block',
            textAlign: 'right',
            fontWeight: 500,
          }}
        >
          {project.year}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;