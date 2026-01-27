import { Transition } from "framer-motion";

// RTL-aware animation utility
const getDirectionalX = (value: number, isRtl: boolean): number => {
    return isRtl ? -value : value;
};

export function useAnimations(totalElements: number, isRtl: boolean) {
    const getInitialAnimationValues = (index: number) => {
        const animationIndex = totalElements - index - 1;
        const xValue = getDirectionalX(520, isRtl);

        if (animationIndex < 7) {
            return {
                opacity: 0,
                scale: 1.6,
                filter: "blur(10px) opacity(0)",
                x: xValue,
                y: -150,
            };
        }
        return {
            opacity: 0,
            scale: 2.6,
            filter: "blur(10px) opacity(0)",
            x: xValue,
            y: -150,
        };
    };

    const getTransitionProps = (index: number): Transition => {
        const animationIndex = totalElements - index - 1;
        if (animationIndex < 7) {
            return {
                delay: animationIndex * 0.03,
                duration: 0.5,
                ease: "easeOut",
            };
        }
        return {
            delay: animationIndex * 0.06,
            duration: 0.8,
            ease: "easeOut",
        };
    };

    const animateTo = {
        opacity: 1,
        scale: 1,
        filter: "blur(0px) opacity(1)",
        x: 0,
        y: 0,
    };

    const getBrandHeaderAnimation = () => ({
        initial: {
            opacity: 0,
            scale: 2,
            filter: "blur(10px) opacity(0)",
            x: getDirectionalX(520, isRtl),
            y: -150,
        },
        transition: {
            delay: (totalElements + 0.5) * 0.05,
            duration: 0.8,
            ease: "easeOut",
        } as Transition,
    });

    return {
        getInitialAnimationValues,
        getTransitionProps,
        animateTo,
        getBrandHeaderAnimation,
    };
}
