import { useMediaQuery } from "react-responsive"
import resolveConfig from 'tailwindcss/resolveConfig';
// @ts-expect-error - tailwind.config.js is a JS file without types
import tailwindConfig from '../../tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);

const breakpoints = {
    isXs: "480px",
    isSm: "640px",
    isMd: "768px",
    isLg: "1024px",
    isXl: "1280px",
};

type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint() {
    // Get breakpoint widths from Tailwind config or fallback to defaults
    const getWidth = (key: BreakpointKey) => 
        fullConfig?.theme?.screens?.[key.replace("is", "").toLowerCase()] || breakpoints[key];
    
    // Call hooks at top level, not in callbacks
    const isXs = useMediaQuery({ query: `(min-width: ${getWidth('isXs')})` });
    const isSm = useMediaQuery({ query: `(min-width: ${getWidth('isSm')})` });
    const isMd = useMediaQuery({ query: `(min-width: ${getWidth('isMd')})` });
    const isLg = useMediaQuery({ query: `(min-width: ${getWidth('isLg')})` });
    const isXl = useMediaQuery({ query: `(min-width: ${getWidth('isXl')})` });
    
    return { isXs, isSm, isMd, isLg, isXl };
}

export default useBreakpoint;