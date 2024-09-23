import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import classnames from "classnames";
import useBreakpoint from "../hooks/useBreakpoint";

export enum SlideshowLayout {
    Column,
    SinglePerRow,
    MultiplePerRow
}

type ControlProps = {
    isActive: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}

type SlideshowProps = {
    slides: React.ReactNode[],
    delay?: number,
    layout?: SlideshowLayout;
    onChange?: (index: number, isDesktop: boolean) => void
}

const FadeControl: React.FC<ControlProps> = ({ isActive, children, onClick }) => {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(scope.current, { opacity: isActive ? 1 : 0.5 }, { duration: 0.5 })
    }, [isActive]);

    return (<motion.div ref={scope} onClick={onClick}>
        {children}
    </motion.div>);
}

const SlideControl: React.FC<ControlProps> = ({ isActive, children, onClick }) => {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(scope.current, { translateX: isActive ? "0" : "100%" }, { duration: 0.5 })
    }, [isActive]);

    return (<motion.div ref={scope} onClick={onClick}>
        {isActive ? children : <></>}
    </motion.div>);
}

const Slideshow: React.FC<SlideshowProps> = ({ slides, delay = 10000, layout = SlideshowLayout.MultiplePerRow, onChange }) => {
    const timeoutId = useRef<NodeJS.Timeout>();
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

    const SlideshowEx = useCallback(({ _active }) => <div className={classnames("flex cursor-pointer", { "flex-col": layout == SlideshowLayout.Column })}>
        {slides.map((s, i) => isLg && (layout != SlideshowLayout.SinglePerRow) ?
            <FadeControl key={"fc" + i} isActive={i == _active} onClick={() => setActive(i)}>{s}</FadeControl> :
            <SlideControl key={"sc" + i} isActive={i == _active} onClick={next}>{s}</SlideControl>)}
    </div>, [slides, layout, isLg]);

    return <SlideshowEx _active={active}></SlideshowEx>;
}

export default Slideshow;