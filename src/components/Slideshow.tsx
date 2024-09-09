import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import classnames from "classnames";
import useBreakpoint from "../hooks/useBreakpoint";

type ControlProps = {
    isActive: boolean;
    children: React.ReactNode;
}

type SlideshowProps = {
    slides: React.ReactNode[],
    delay?: number,
    isColumnLayout?: boolean;
    onChange?: (index: number, isDesktop: boolean) => void
}

const FadeControl: React.FC<ControlProps> = ({ isActive, children }) => {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(scope.current, { opacity: isActive ? 1 : 0.5 }, { duration: 0.5 })
    }, [isActive]);

    return (<motion.div ref={scope}>
        {children}
    </motion.div>);
}

const SlideControl: React.FC<ControlProps> = ({ isActive, children }) => {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(scope.current, { translateX: isActive ? "0" : "100%" }, { duration: 0.5 })
    }, [isActive]);

    return (<motion.div ref={scope}>
        {isActive ? children : <></>}
    </motion.div>);
}

const Slideshow: React.FC<SlideshowProps> = ({ slides, delay = 10000, isColumnLayout = false, onChange }) => {
    const timeoutId = useRef<number>();
    const [active, setActive] = useState(0);
    const { isLg } = useBreakpoint();

    const next = () => setActive(i => (i + 1) % slides.length);

    useEffect(() => {
        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(next, delay);
        onChange?.(active, isLg);
        return () => clearTimeout(timeoutId.current);
    }, [active]);

    useEffect(() => onChange?.(active, isLg), [isLg]);

    const Mobile = useCallback(({ _active }) => <div className="flex">
        {slides.map((s, i) => <SlideControl key={i} isActive={i == _active}>{s}</SlideControl>)}
    </div>, [slides]);

    const Desktop = useCallback(({ _active }) => <div className={classnames("flex", { "flex-col": isColumnLayout })}>
        {slides.map((s, i) => <FadeControl key={i} isActive={i == _active}>{s}</FadeControl>)}
    </div>, [slides]);

    return isLg ? <Desktop _active={active} /> : <Mobile _active={active} />;
}

export default Slideshow;