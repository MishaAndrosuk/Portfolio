import React from 'react';
import { Box } from '@mui/material';
import { useScrollProgress } from '../../hooks/useScrollProgress';

/** Тонка смужка прогресу прокрутки під хедером. */
const ScrollProgress: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 1300,
        pointerEvents: 'none',
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',
          backgroundColor: 'var(--c-accent)',
          transformOrigin: '0 50%',
          transform: `scaleX(${progress})`,
          // короткий transition згладжує «рвані» кадри скролу
          transition: 'transform 120ms linear',
        }}
      />
    </Box>
  );
};

export default ScrollProgress;
