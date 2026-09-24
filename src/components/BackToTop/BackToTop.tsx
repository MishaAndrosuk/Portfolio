import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { motion } from '../../theme';

/** Кнопка «нагору» — зʼявляється після першого екрана. */
const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { scrollToTop } = useSmoothScroll();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <IconButton
      onClick={scrollToTop}
      aria-label={t('actions.backToTop')}
      className="no-print"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      sx={{
        position: 'fixed',
        right: { xs: 16, md: 28 },
        bottom: { xs: 16, md: 28 },
        zIndex: 1200,
        width: 44,
        height: 44,
        color: 'var(--c-ink)',
        backgroundColor: 'var(--c-surface)',
        border: '1px solid var(--c-border)',
        boxShadow: 'var(--c-shadow-md)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(8px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: `opacity ${motion.base} ${motion.ease}, transform ${motion.base} ${motion.ease}, border-color ${motion.base} ${motion.ease}`,
        '&:hover': {
          backgroundColor: 'var(--c-surface)',
          borderColor: 'var(--c-accent)',
          color: 'var(--c-accent)',
        },
      }}
    >
      <KeyboardArrowUp />
    </IconButton>
  );
};

export default BackToTop;
