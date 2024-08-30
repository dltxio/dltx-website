import { useMediaQuery } from "react-responsive"
import resolveConfig from 'tailwindcss/resolveConfig';
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
    var keys = Object.keys(breakpoints) as unknown as BreakpointKey[];
    return keys.reduce((acc, key) => {
        const width = fullConfig?.theme?.screens?.[key.replace("is", "").toLowerCase()] || breakpoints[key];
        return { ...acc, [key]: useMediaQuery({ query: `(min-width: ${width})` }) }
    }, {}) as Record<BreakpointKey, boolean>;
}

export default useBreakpoint;