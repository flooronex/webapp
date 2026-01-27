"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { MetricProps } from "../types";

export function useAnimatedValues(isVisible: boolean, metrics: MetricProps[]) {
    const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0]);
    const hasAnimated = useRef(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Memoize the target values to avoid dependency issues
    const targetValues = useRef(metrics.map(m => m.value));

    // Update target values when metrics change
    useEffect(() => {
        targetValues.current = metrics.map(m => m.value);
    }, [metrics]);

    const startAnimation = useCallback(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const animationDuration = 1800;
        const stepTime = 20;
        const steps = animationDuration / stepTime;

        let currentStep = 0;

        // Clear any existing timer
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            currentStep++;
            const progress = Math.min(currentStep / steps, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            setAnimatedValues(
                targetValues.current.map((value) => Math.ceil(value * easeOutQuart))
            );

            if (progress >= 1) {
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                }
            }
        }, stepTime);
    }, []);

    useEffect(() => {
        if (isVisible) {
            // Small delay to ensure component is fully mounted and painted
            const timeoutId = setTimeout(() => {
                startAnimation();
            }, 100);

            return () => clearTimeout(timeoutId);
        }
    }, [isVisible, startAnimation]);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, []);

    return animatedValues;
}
