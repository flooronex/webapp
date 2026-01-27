"use client";

import { useState, useRef, RefObject, useCallback, useEffect } from "react";

export interface SliderStyle {
    left: number;
    width: number;
    transformOrigin?: string;
    transition?: string;
}

export interface UseSliderAnimationReturn {
    sliderStyle: SliderStyle;
    activeLink: number | null;
    isAnimating: boolean;
    navLinksRef: RefObject<HTMLUListElement | null>;
    handleLinkHover: (e: React.MouseEvent<HTMLLIElement>, index: number) => void;
    handleLinksMouseLeave: () => void;
    isHovered: RefObject<boolean>;
}

export function useSliderAnimation(): UseSliderAnimationReturn {
    const [sliderStyle, setSliderStyle] = useState<SliderStyle>({
        left: 0,
        width: 0,
        transformOrigin: "50% 50%",
    });
    const [activeLink, setActiveLink] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const navLinksRef = useRef<HTMLUListElement>(null);
    const isHovered = useRef(false);
    const timeoutRef = useRef<NodeJS.Timeout>(null);
    const prevWidthRef = useRef<number>(0);

    useEffect(() => {
        const timeout = timeoutRef.current;
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, []);

    const handleLinksMouseLeave = useCallback(() => {
        isHovered.current = false;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setActiveLink(null);
        setIsAnimating(false);
        prevWidthRef.current = 0;
        setSliderStyle((prev) => ({
            ...prev,
            width: 0,
            transition: "none",
        }));
    }, []);

    const handleLinkHover = useCallback(
        (e: React.MouseEvent<HTMLLIElement>, index: number) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            const linkRect = e.currentTarget.getBoundingClientRect();
            const containerRect = navLinksRef.current?.getBoundingClientRect();

            if (containerRect) {
                const centerX = linkRect.left - containerRect.left + linkRect.width / 2;
                const exactWidth = Math.round(linkRect.width);

                prevWidthRef.current = exactWidth;

                if (!isAnimating) {
                    setSliderStyle({
                        left: linkRect.left - containerRect.left,
                        width: exactWidth,
                        transformOrigin: `${centerX}px 50%`,
                        transition: "none",
                    });
                    setIsAnimating(true);
                } else {
                    setSliderStyle({
                        left: linkRect.left - containerRect.left,
                        width: exactWidth,
                        transformOrigin: `${centerX}px 50%`,
                        transition: `left ${Math.abs(prevWidthRef.current - exactWidth) > 5 ? "0.3s" : "0.3s"
                            } ease-in-out, width ${Math.abs(prevWidthRef.current - exactWidth) > 5 ? "0.2s" : "0.2s"
                            } ease-in-out`,
                    });
                }
                setActiveLink(index);
            }
            isHovered.current = true;
        },
        [isAnimating]
    );

    return {
        sliderStyle,
        activeLink,
        isAnimating,
        navLinksRef,
        handleLinkHover,
        handleLinksMouseLeave,
        isHovered,
    };
}
