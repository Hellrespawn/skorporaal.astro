import * as React from "react";

import { throttleV2 } from "../utils";
import useBoundingBox from "../hooks/use-bounding-box";

interface Options {
    buffer?: number;
    throttleBy?: number;
    excludeTouchEvents?: boolean;
    onEnterBox?: () => void;
    onLeaveBox?: () => void;
}

interface MousePosition {
    x: number | null;
    y: number | null;
}

function useMousePositionWithinElement(
    ref: React.RefObject<HTMLElement>,
    {
        buffer = 0,
        throttleBy = 18,
        excludeTouchEvents,
        onEnterBox,
        onLeaveBox,
    }: Options = {}
): [MousePosition, DOMRect | null] {
    const boundingBox = useBoundingBox(ref);
    const [mousePosition, setMousePosition] = React.useState<MousePosition>({
        x: null,
        y: null,
    });
    const cachedIsWithinBox = React.useRef(false);

    const cachedOnEnterBox = React.useRef(onEnterBox);
    const cachedOnLeaveBox = React.useRef(onLeaveBox);
    cachedOnEnterBox.current = onEnterBox;
    cachedOnLeaveBox.current = onLeaveBox;

    React.useEffect(() => {
        const onEnterBox = cachedOnEnterBox.current;
        const onLeaveBox = cachedOnLeaveBox.current;

        const updatePosition = (ev: MouseEvent | Touch) => {
            // For mouse events, prevent the default text selection.
            if (isMouseEvent(ev)) {
                ev.preventDefault();
                ev.stopPropagation();
            }

            const { clientX, clientY } = ev;

            if (!boundingBox) {
                return;
            }

            // NOTE: Because I'm monkey-patching `boundingBox.right` and `boundingBox.bottom`, I can't use them as I'd expect here.
            const isWithinBox =
                clientX >= boundingBox.left - buffer &&
                clientX <= boundingBox.left + boundingBox.width + buffer &&
                clientY >= boundingBox.top - buffer &&
                clientY <= boundingBox.top + boundingBox.height + buffer;

            if (!isWithinBox) {
                if (
                    cachedIsWithinBox.current &&
                    typeof onLeaveBox === "function"
                ) {
                    onLeaveBox();
                }

                cachedIsWithinBox.current = false;
                return;
            }

            if (!cachedIsWithinBox.current) {
                if (typeof onEnterBox === "function") {
                    onEnterBox();
                }
                cachedIsWithinBox.current = true;
            }

            const newPosition = {
                x: clientX - boundingBox.left,
                y: clientY - boundingBox.top,
            };

            cachedIsWithinBox.current = true;

            setMousePosition(newPosition);
        };

        const [throttledUpdateMousePosition, mouseCleanup] = throttleV2(
            updatePosition,
            throttleBy
        );
        const [throttledUpdateTouchPosition, touchCleanup] = throttleV2(
            (ev: TouchEvent) => {
                const touch = ev.touches[0];
                updatePosition(touch);
            },
            throttleBy
        );

        window.addEventListener("mousemove", throttledUpdateMousePosition);
        if (!excludeTouchEvents) {
            window.addEventListener("touchmove", throttledUpdateTouchPosition);
        }

        return () => {
            window.removeEventListener(
                "mousemove",
                throttledUpdateMousePosition
            );
            mouseCleanup();
            if (!excludeTouchEvents) {
                window.removeEventListener(
                    "touchmove",
                    throttledUpdateTouchPosition
                );

                touchCleanup();
            }
        };
    }, [boundingBox, buffer, throttleBy, excludeTouchEvents]);

    return [mousePosition, boundingBox];
}

const isMouseEvent = (ev: MouseEvent | Touch): ev is MouseEvent => {
    return ev instanceof MouseEvent;
};

export default useMousePositionWithinElement;
