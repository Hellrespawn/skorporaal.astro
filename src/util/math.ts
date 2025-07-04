export type Scale = [number, number];

interface ScaleOptions {
    clamp: boolean;
}

export function scale(
    value: number,
    fromScale: Scale,
    toScale: Scale,
    options?: ScaleOptions
): number {
    const standardValue =
        (value - fromScale[0]) / (fromScale[1] - fromScale[0]);

    let scaledValue = (toScale[1] - toScale[0]) * standardValue + toScale[0];

    if (options?.clamp) {
        scaledValue = clamp(scaledValue, toScale);
    }

    return scaledValue;
}

export function clamp(value: number, scale: Scale): number {
    const min = Math.min(...scale);
    const max = Math.max(...scale);

    return Math.max(min, Math.min(max, value));
}

export interface Point {
    x: number;
    y: number;
}

export function distance(point1: Point, point2: Point): number {
    const dx = Math.abs(point1.x - point2.x);
    const dy = Math.abs(point1.y - point2.y);

    return Math.sqrt(dx ** 2 + dy ** 2);
}

export function angleInRadians(point1: Point, point2: Point): number {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;

    let angle = Math.atan2(dy, dx);

    if (angle < 0) {
        angle = angle + 2 * Math.PI;
    }

    return angle;
}

export function radiansToDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
}

export function pointAtAngleAndDistance(
    point: Point,
    angle: number,
    distance: number
): Point {
    const dx = distance * Math.cos(angle);
    const dy = distance * Math.sin(angle);

    return {
        x: point.x + dx,
        y: point.y + dy,
    };
}
