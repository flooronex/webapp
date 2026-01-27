import { useRef, useState } from "react";

export function useCardHover() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // Calculate mouse position relative to card center
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Calculate rotation (limited range for subtle effect)
        setRotateX(-y * 0.01); // Inverse Y for natural tilt
        setRotateY(x * 0.01);
    };

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Reset rotations
        setRotateX(0);
        setRotateY(0);
    };

    return {
        cardRef,
        isHovered,
        rotateX,
        rotateY,
        handleMouseMove,
        handleMouseEnter,
        handleMouseLeave
    };
}