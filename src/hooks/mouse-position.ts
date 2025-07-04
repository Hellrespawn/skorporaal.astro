import { useEffect, useState } from "react";
import {
    angleInRadians,
    distance,
    pointAtAngleAndDistance,
    type Point,
} from "../util/math";

export function useMousePosition() {
    const [position, setPosition] = useState<Point | null>(null);

    function onMouseMove(ev: MouseEvent) {
        setPosition({ x: ev.x, y: ev.y });
    }

    useEffect(() => {
        document.addEventListener("mousemove", onMouseMove);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
        };
    });

    return position;
}

export function useRelativeMousePosition(rect: DOMRect | null) {
    const position = useMousePosition();

    let relativePosition: Point | null;

    if (!rect || !position) {
        relativePosition = null;
    } else {
        const relativeX = position.x - rect.left;
        const relativeY = position.y - rect.top;

        relativePosition = { x: relativeX, y: relativeY };
    }

    function getDistance(x: number, y: number): number | null {
        if (!relativePosition) {
            return null;
        }

        return distance(relativePosition, { x, y });
    }

    function getAngle(x: number, y: number): number | null {
        if (!relativePosition) {
            return null;
        }

        return angleInRadians(relativePosition, { x, y });
    }

    function getPointTowardsCursor(
        x: number,
        y: number,
        distance: number
    ): Point | null {
        const angle = getAngle(x, y);

        if (!relativePosition || !angle) {
            return null;
        }

        return pointAtAngleAndDistance({ x, y }, angle, distance);
    }

    return {
        position: relativePosition,
        getDistance,
        getAngle,
        getPointTowardsCursor,
    };
}
