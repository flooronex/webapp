"use client";

import { useState, useEffect, useRef } from "react";
import { Scenario, ChartDataPoint } from "../types";

interface UseScenariosReturn {
    data: ChartDataPoint[];
    serverCount: number;
}

export function useScenarios(
    isVisible: boolean,
    scenarios: Scenario[]
): UseScenariosReturn {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [data, setData] = useState(scenarios[0].data);
    const [serverCount, setServerCount] = useState(scenarios[0].serverCount);
    const [cycleCount, setCycleCount] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Animate server count changes
    const animateServerCount = (from: number, to: number) => {
        const duration = 1500;
        const frameRate = 50;
        const steps = duration / frameRate;
        const increment = (to - from) / steps;
        let current = from;
        let step = 0;

        const updateFrame = () => {
            if (step++ < steps) {
                current += increment;
                setServerCount(Math.round(current));
                requestAnimationFrame(updateFrame);
            } else {
                setServerCount(to);
            }
        };

        requestAnimationFrame(updateFrame);
    };

    useEffect(() => {
        if (!isVisible) return;

        intervalRef.current = setInterval(() => {
            const nextScenario = (currentScenario + 1) % scenarios.length;
            setCurrentScenario(nextScenario);

            animateServerCount(
                scenarios[currentScenario].serverCount,
                scenarios[nextScenario].serverCount
            );

            setTimeout(() => {
                setData(scenarios[nextScenario].data);
            }, 300);

            setCycleCount((prev) => prev + 1);
        }, 5000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isVisible, currentScenario, cycleCount, scenarios]);

    return { data, serverCount };
}
