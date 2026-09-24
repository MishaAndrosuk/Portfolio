import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface RoleRotatorProps {
  roles: string[];
}

const TYPE_MS = 55;
const ERASE_MS = 28;
const HOLD_MS = 1800;

/**
 * Ефект друку зі зміною ролей у головному заголовку.
 * За prefers-reduced-motion показує перелік ролей статично, без анімації.
 */
const RoleRotator: React.FC<RoleRotatorProps> = ({ roles }) => {
  const reducedMotion = usePrefersReducedMotion();
  const [text, setText] = useState(roles[0] ?? '');
  const [index, setIndex] = useState(0);
  const [erasing, setErasing] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (reducedMotion || roles.length < 2) return;

    const current = roles[index % roles.length];

    if (!erasing && text === current) {
      timer.current = window.setTimeout(() => setErasing(true), HOLD_MS);
    } else if (erasing && text === '') {
      setErasing(false);
      setIndex((i) => (i + 1) % roles.length);
    } else {
      timer.current = window.setTimeout(
        () =>
          setText((prev) =>
            erasing ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
          ),
        erasing ? ERASE_MS : TYPE_MS
      );
    }

    return () => window.clearTimeout(timer.current);
  }, [text, erasing, index, roles, reducedMotion]);

  if (reducedMotion) {
    return <Box component="span">{roles.join(' · ')}</Box>;
  }

  return (
    <Box component="span" sx={{ display: 'inline-flex', alignItems: 'baseline' }}>
      {/* Зчитувачі екрана озвучують повний перелік, а не посимвольний набір */}
      <span className="sr-only">{roles.join(', ')}</span>
      <Box component="span" aria-hidden="true">
        {text}
      </Box>
      <Box
        component="span"
        aria-hidden="true"
        sx={{
          display: 'inline-block',
          width: '2px',
          alignSelf: 'stretch',
          ml: '3px',
          backgroundColor: 'var(--c-accent)',
          animation: 'caret 1.1s steps(1) infinite',
          '@keyframes caret': { '0%, 45%': { opacity: 1 }, '50%, 100%': { opacity: 0 } },
        }}
      />
    </Box>
  );
};

export default RoleRotator;
