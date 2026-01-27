import { Transition } from "framer-motion";

// RTL-aware animation utilities
export const getDirectionalX = (value: number, isRtl: boolean): number => {
    return isRtl ? -value : value;
};

// KPI card animation helpers
export const getKpiCardAnimation = (
    index: number,
    totalItems: number,
    isRtl: boolean = false
) => {
    const animationIndex = totalItems - index - 1;
    const baseDelay = 1.0;
    const xValue = getDirectionalX(520, isRtl);

    const initial =
        animationIndex < 7
            ? {
                opacity: 0,
                scale: 1.6,
                filter: "blur(10px) opacity(0)",
                x: xValue,
                y: -150,
            }
            : {
                opacity: 0,
                scale: 2.6,
                filter: "blur(10px) opacity(0)",
                x: xValue,
                y: -150,
            };

    const transition: Transition =
        animationIndex < 7
            ? {
                delay: baseDelay + animationIndex * 0.03,
                duration: 0.5,
                ease: "easeOut",
            }
            : {
                delay: baseDelay + animationIndex * 0.06,
                duration: 0.8,
                ease: "easeOut",
            };

    return { initial, transition };
};

export const kpiCardAnimateTo = {
    opacity: 1,
    scale: 1,
    filter: "blur(0px) opacity(1)",
    x: 0,
    y: 0,
};

// Table row animation helpers
export const getTableRowAnimation = (
    index: number,
    totalItems: number,
    isRtl: boolean = false
) => {
    const animationIndex = totalItems - index - 1;
    const baseDelay = 1;
    const xValue = getDirectionalX(520, isRtl);

    const initial =
        animationIndex < 7
            ? {
                opacity: 0,
                scale: 1.6,
                filter: "blur(10px) opacity(0)",
                x: xValue,
                y: -150,
            }
            : {
                opacity: 0,
                scale: 2.6,
                filter: "blur(10px) opacity(0)",
                x: xValue,
                y: -150,
            };

    const transition: Transition =
        animationIndex < 4
            ? {
                delay: baseDelay + animationIndex * 0.08,
                duration: 0.5,
                ease: "easeOut",
            }
            : {
                delay: baseDelay + animationIndex * 0.08,
                duration: 0.9,
                ease: "easeOut",
            };

    return { initial, transition };
};

export const tableRowAnimateTo = {
    opacity: 1,
    scale: 1,
    filter: "blur(0px) opacity(1)",
    x: 0,
    y: 0,
};

// Section header animation
export const getSectionHeaderAnimation = () => {
    const initial = {
        opacity: 0,
        y: -20,
    };

    const transition: Transition = {
        delay: 0.6,
        duration: 0.5,
        ease: "easeOut",
    };

    return { initial, transition };
};

export const sectionHeaderAnimateTo = {
    opacity: 1,
    y: 0,
};
