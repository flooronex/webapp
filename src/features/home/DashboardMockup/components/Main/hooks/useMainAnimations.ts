import { Transition } from "framer-motion";
import { getDirectionalX } from "../config/animations";

export function useMainAnimations(isRtl: boolean) {
    const initialAnimation = {
        opacity: 0,
        scale: 1.3,
        filter: "blur(10px) opacity(0)",
        x: getDirectionalX(520, isRtl),
        y: -150,
        transformPerspective: 500,
    };

    const animateTo = {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        filter: "blur(0px) opacity(1)",
    };

    const transitionProps: Transition = {
        delay: 0.3,
        duration: 0.9,
        ease: "easeOut",
    };

    return {
        initialAnimation,
        animateTo,
        transitionProps,
    };
}
