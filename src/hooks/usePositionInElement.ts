import { useEffect, useRef, useState } from "react";

export function usePositionInElement() {
    const ref = useRef<HTMLElement>(null);

    const [position, setPosition] = useState<{
        x: number | null;
        y: number | null;
    }>({ x: null, y: null });

    useEffect(() => {
        function mouseMoveHandler(e: MouseEvent) {
            const rect: DOMRect = (
                e.target as HTMLElement
            )?.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            console.log({ x, y });

            setPosition({ x, y });
        }

        const element = ref.current;

        if (element) {
            console.log("element");
            element.addEventListener("mousemove", mouseMoveHandler);
        } else {
            console.log("not element");
        }

        return () => {
            element?.removeEventListener("mousemove", mouseMoveHandler);
        };
    }, [ref]);

    return { ref, position };
}
