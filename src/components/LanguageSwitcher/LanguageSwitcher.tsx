import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';

interface LanguageSwitcherProps {
  showText?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ showText = false }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { currentLanguage, availableLanguages, changeLanguage } = useLanguage();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-label="Change language"
        sx={{
          color: 'text.primary',
          minWidth: { xs: 40, sm: 48 },
          width: { xs: 40, sm: 48 },
          height: { xs: 40, sm: 48 },
          p: { xs: 1, sm: 1.5 },
          '&:hover': {
            backgroundColor: 'action.hover',
          }
        }}
      >
        {showText ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography component="span" fontSize="1.2rem">
              {currentLanguage.flag}
            </Typography>
            <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>
              {currentLanguage.code.toUpperCase()}
            </Typography>
          </Box>
        ) : (
          <LanguageIcon />
        )}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 180,
            borderRadius: 2,
            boxShadow: 3,
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1.5,
              borderRadius: 1,
              mx: 1,
              mb: 0.5,
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }
          }
        }}
      >
        {availableLanguages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={language.code === currentLanguage.code}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Typography component="span" fontSize="1.2rem">
                {language.flag}
              </Typography>
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2">{language.name}</Typography>
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;