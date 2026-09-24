import React, { useCallback, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { motion } from '../../theme';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { ASSETS } from '../../config/site';

interface TiltPhotoProps {
  alt: string;
}

/** Максимальний кут нахилу — навмисно малий, щоб ефект був ледь відчутним. */
const MAX_TILT = 6;

/** Фото з легким 3D-нахилом за курсором. На тач-пристроях і при reduced-motion — статичне. */
const TiltPhoto: React.FC<TiltPhotoProps> = ({ alt }) => {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion || event.pointerType !== 'mouse' || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: -py * MAX_TILT * 2, y: px * MAX_TILT * 2 });
    },
    [reducedMotion]
  );

  const reset = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <Box
      sx={{
        perspective: '1000px',
        width: '100%',
        maxWidth: { xs: 300, sm: 360, md: 400 },
        mx: 'auto',
      }}
    >
      <Box
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        sx={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid var(--c-border)',
          backgroundColor: 'var(--c-subtle)',
          boxShadow: 'var(--c-shadow-lg)',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: reducedMotion
            ? 'none'
            : `transform ${motion.base} ${motion.ease}, box-shadow ${motion.base} ${motion.ease}`,
          transformStyle: 'preserve-3d',
        }}
      >
        <picture>
          <source
            type="image/webp"
            srcSet={ASSETS.avatar.webpSrcSet}
            sizes="(max-width: 600px) 300px, (max-width: 900px) 360px, 400px"
          />
          <Box
            component="img"
            src={ASSETS.avatar.jpg}
            alt={alt}
            width={ASSETS.avatar.width}
            height={ASSETS.avatar.height}
            // hero-зображення: вантажимо одразу й з пріоритетом
            loading="eager"
            fetchPriority="high"
            decoding="async"
            sx={{ width: '100%', height: 'auto', aspectRatio: '4 / 5', objectFit: 'cover' }}
          />
        </picture>
      </Box>
    </Box>
  );
};

export default TiltPhoto;
