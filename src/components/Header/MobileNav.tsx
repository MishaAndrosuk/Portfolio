import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  Button,
} from '@mui/material';
import { Close, Download } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { SECTION_IDS, ASSETS } from '../../config/site';

interface MobileNavProps {
  open: boolean;
  activeSection: string;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

/**
 * Мобільне меню винесене в окремий модуль і підвантажується лише при відкритті:
 * MUI Drawer тягне за собою Modal із focus trap, а це помітний шматок JS,
 * який на першому рендері не потрібен.
 */
const MobileNav: React.FC<MobileNavProps> = ({ open, activeSection, onClose, onNavigate }) => {
  const { t } = useTranslation();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: 'min(320px, 85vw)',
            backgroundColor: 'var(--c-surface)',
            backgroundImage: 'none',
            borderLeft: '1px solid var(--c-border)',
          },
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1.5 }}>
        <IconButton onClick={onClose} aria-label={t('actions.closeMenu')}>
          <Close />
        </IconButton>
      </Box>

      <Box component="nav" aria-label={t('nav.label')}>
        <List sx={{ px: 1 }}>
          {SECTION_IDS.map((id) => (
            <ListItemButton
              key={id}
              onClick={() => onNavigate(id)}
              selected={activeSection === id}
              sx={{
                borderRadius: '10px',
                mb: 0.5,
                '&.Mui-selected': { backgroundColor: 'var(--c-accent-soft)' },
              }}
            >
              <ListItemText primary={t(`nav.${id}`)} slotProps={{ primary: { fontWeight: 550 } }} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Divider sx={{ borderColor: 'var(--c-border)', mx: 2 }} />

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Download />}
          href={ASSETS.cv}
          download={ASSETS.cvFileName}
          onClick={onClose}
        >
          {t('actions.downloadCV')}
        </Button>
      </Box>
    </Drawer>
  );
};

export default MobileNav;
