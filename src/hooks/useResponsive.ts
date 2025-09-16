import { useState, useEffect } from 'react';

interface BreakpointConfig {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWide: boolean;
  width: number;
  height: number;
}

const defaultBreakpoints: BreakpointConfig = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
};

export const useResponsive = (customBreakpoints?: Partial<BreakpointConfig>): ResponsiveState => {
  const breakpoints = { ...defaultBreakpoints, ...customBreakpoints };

  const [state, setState] = useState<ResponsiveState>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        isWide: false,
        width: 0,
        height: 0,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    return {
      isMobile: width < breakpoints.mobile,
      isTablet: width >= breakpoints.mobile && width < breakpoints.desktop,
      isDesktop: width >= breakpoints.desktop && width < breakpoints.wide,
      isWide: width >= breakpoints.wide,
      width,
      height,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setState({
        isMobile: width < breakpoints.mobile,
        isTablet: width >= breakpoints.mobile && width < breakpoints.desktop,
        isDesktop: width >= breakpoints.desktop && width < breakpoints.wide,
        isWide: width >= breakpoints.wide,
        width,
        height,
      });
    };

    // Debounce resize handler
    let timeoutId: number;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize);

    // Call once to set initial state
    handleResize();

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [breakpoints.mobile, breakpoints.tablet, breakpoints.desktop, breakpoints.wide]);

  return state;
};

// Helper hook for specific breakpoint checks
export const useBreakpoint = () => {
  const responsive = useResponsive();

  return {
    ...responsive,
    // Additional utility methods
    isSmallScreen: responsive.isMobile || responsive.isTablet,
    isLargeScreen: responsive.isDesktop || responsive.isWide,
    isTouchDevice: responsive.isMobile || responsive.isTablet,

    // Grid column counts based on screen size
    getGridColumns: (mobile = 1, tablet = 2, desktop = 3, wide = 4) => {
      if (responsive.isMobile) return mobile;
      if (responsive.isTablet) return tablet;
      if (responsive.isDesktop) return desktop;
      return wide;
    },

    // Spacing based on screen size
    getSpacing: (mobile = 1, tablet = 2, desktop = 3) => {
      if (responsive.isMobile) return mobile;
      if (responsive.isTablet) return tablet;
      return desktop;
    },

    // Orientation detection
    isLandscape: responsive.width > responsive.height,
    isPortrait: responsive.width <= responsive.height,
  };
};