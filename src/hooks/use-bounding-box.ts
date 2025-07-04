import * as React from "react";

import { debounce, throttle } from "../utils";

const useBoundingBox = (
    ref: React.RefObject<HTMLElement | SVGSVGElement>,
    scrollDebounce = 80,
    resizeThrottle = 60
): DOMRect | null => {
    const [box, setBox] = React.useState<DOMRect | null>(null);

    React.useEffect(() => {
        // NOTE: This will happen if the element is conditionally rendered and NOT part of the initial render. A better version of this hook should somehow handle this case. For now, the hook just doesn't work (I think?).
        if (!ref.current) {
            return;
        }

        // Wait a sec before calculating the initial value.
        window.setTimeout(() => {
            if (!ref.current) {
                return;
            }

            setBox(getAugmentedBox(ref.current.getBoundingClientRect()));
        }, 200);

        function update() {
            const newBox = ref.current?.getBoundingClientRect();

            if (newBox) {
                setBox(getAugmentedBox(newBox));
            }
        }

        const handleScroll = scrollDebounce
            ? debounce(update, scrollDebounce)
            : update;
        const handleResize = resizeThrottle
            ? throttle(update, resizeThrottle)
            : update;

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, [ref, resizeThrottle, scrollDebounce]);

    return box;
};

/*
  DOMRects have some confusing things:
  - `bottom` and `right` are measured from the top/left, rather than the bottom/right
  - `x` and `y` are equivalent to `left` and `top`, rather than the center of the box

  This function tweaks these properties to be more useful. `right` is the distance between the right edge of the box and the right edge of the viewport. `x` is the X position of the box’s center.

  Rather than adding new properties, I'm overwriting existing ones. That way I can keep using the DOMRect type.
*/
function getAugmentedBox(box: DOMRect | null): DOMRect | null {
    if (!box) {
        return null;
    }

    const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

    return {
        top: box.top,
        left: box.left,
        right: window.innerWidth - box.right - scrollbarWidth,
        bottom: window.innerHeight - box.bottom,
        height: box.height,
        width: box.width,
        x: box.left + box.width / 2,
        y: box.top + box.height / 2,
        toJSON() {
            return this;
        },
    };
}

export default useBoundingBox;
