import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemText, Tooltip, Box } from '@mui/material';
import { TranslateOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { currentLanguage, availableLanguages, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const close = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title={t('actions.changeLanguage')}>
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          aria-label={t('actions.changeLanguage')}
          aria-haspopup="menu"
          aria-expanded={Boolean(anchorEl)}
          sx={{ color: 'var(--c-ink-muted)', '&:hover': { color: 'var(--c-ink)' } }}
        >
          <TranslateOutlined />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 180,
              border: '1px solid var(--c-border)',
              backgroundColor: 'var(--c-surface)',
              backgroundImage: 'none',
            },
          },
        }}
      >
        {availableLanguages.map((lang) => (
          <MenuItem
            key={lang.code}
            selected={lang.code === currentLanguage.code}
            onClick={() => {
              changeLanguage(lang.code);
              close();
            }}
            sx={{ gap: 1.5, '&.Mui-selected': { backgroundColor: 'var(--c-accent-soft)' } }}
          >
            <Box component="span" aria-hidden="true" sx={{ fontSize: '1.1rem' }}>
              {lang.flag}
            </Box>
            <ListItemText primary={lang.name} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
