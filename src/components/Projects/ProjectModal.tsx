import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Close, Launch, Code } from '@mui/icons-material';
import type { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (!project) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : 3,
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2,
        }}
      >
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          {project.title}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 0 }}>
        <Box sx={{ mb: 3 }}>
          <Box
            component="img"
            src={project.image}
            alt={`${project.title} проєкт скріншот`}
            sx={{
              width: '100%',
              height: { xs: 200, md: 300 },
              objectFit: 'cover',
              borderRadius: 2,
              mb: 3,
            }}
          />

          <Typography
            variant="body1"
            sx={{
              mb: 3,
              lineHeight: 1.7,
              color: 'text.primary',
            }}
          >
            {project.description}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'text.primary',
              }}
            >
              Використані технології:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {project.tech.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  variant="outlined"
                  color="primary"
                  sx={{ fontWeight: 500 }}
                />
              ))}
            </Stack>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'text.primary',
              }}
            >
              Ключові особливості:
            </Typography>
            <List dense>
              {project.highlights.map((highlight, index) => (
                <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                  <ListItemText
                    primary={`• ${highlight}`}
                    primaryTypographyProps={{
                      color: 'text.primary',
                      fontSize: '0.95rem',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'text.primary',
              }}
            >
              Деталі проєкту:
            </Typography>
            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Рік:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {project.year}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Статус:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {project.status === 'completed' ? 'Завершено' : 'В розробці'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 2 }}>
        {project.demoUrl && (
          <Button
            variant="contained"
            startIcon={<Launch />}
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
            }}
          >
            Переглянути Demo
          </Button>
        )}
        {project.repoUrl && (
          <Button
            variant="outlined"
            startIcon={<Code />}
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
            }}
          >
            Переглянути код
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ProjectModal;