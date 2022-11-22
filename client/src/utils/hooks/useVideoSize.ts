import { useEffect, useState } from "react";
import { getVideoBoxSize } from "../getVideoBoxSize";

const TOP_BAR_HEIGHT = 40;

const useVideoSize = (
    N = 1,
    AR = 1
): { x: number; y: number; X: number; Y: number } => {
    const [size, setSize] = useState<{ X?: number; Y?: number }>({});
    const [isMobile, setIsMobile] = useState(
        window.matchMedia("(max-width: 480px)").matches
    );

    useEffect(() => {
        const listener = (e: MediaQueryListEvent) => {
            if (e.matches) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        window
            .matchMedia("(max-width: 480px)")
            .addEventListener("change", listener);

        return () =>
            window
                .matchMedia("(max-width: 480px)")
                .removeEventListener("change", listener);
    }, [setIsMobile]);

    useEffect(() => {
        const listener = () => {
            // on mobiles, dont listen to change
            if (isMobile) {
                return;
            }
            const Y = window.innerHeight - TOP_BAR_HEIGHT;
            const X = window.innerWidth;
            setSize({ X, Y });
        };
        // initial values
        const Y = window.innerHeight - TOP_BAR_HEIGHT;
        const X = window.innerWidth;
        setSize({ X, Y });
        window.addEventListener("resize", listener);
        return () => {
            window.removeEventListener("resize", listener);
        };
    }, [isMobile, setSize]);

    const { X = 500, Y = 800 } = size; // bad defaults
    const { x, y } = getVideoBoxSize(X, Y, N, AR);

    // x = isMobile ? X : x
    // y = isMobile ? X / AR : y

    return { x, y, X, Y };
};

export default useVideoSize;
