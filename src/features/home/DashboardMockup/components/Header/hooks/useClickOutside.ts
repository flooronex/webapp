import { useEffect, RefObject } from "react";

export function useClickOutside<T extends HTMLElement>(
    ref: RefObject<T>,
    handler: () => void,
    isActive: boolean
) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler();
            }
        }

        if (isActive) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, handler, isActive]);
}
