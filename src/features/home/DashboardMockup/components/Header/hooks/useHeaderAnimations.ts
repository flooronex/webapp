import { Transition } from "framer-motion";

// RTL-aware animation utility
const getDirectionalX = (value: number, isRtl: boolean): number => {
    return isRtl ? -value : value;
};

export function useHeaderAnimations(isRtl: boolean) {
    const initialAnimation = {
        opacity: 0,
        scale: 1.3,
        filter: "blur(105px) opacity(0)",
        x: getDirectionalX(520, isRtl),
        y: -150,
        transformPerspective: 500,
    };

    const animateTo = {
        opacity: 1,
        scale: 1,
        filter: "blur(0px) opacity(1)",
        x: 0,
        y: 0,
    };

    const transitionProps: Transition = {
        type: "tween",
        delay: 0.7,
        duration: 0.9,
        ease: "easeOut",
    };

    return {
        initialAnimation,
        animateTo,
        transitionProps,
    };
}
