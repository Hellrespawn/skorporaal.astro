import { expect, test, describe } from "vitest";
import {
    angleInRadians,
    distance,
    pointAtAngleAndDistance,
    scale,
    type Point,
    type Scale,
} from "./math";

function valueName(value: number, char: string) {
    if (value > 0) {
        return `+${char}`;
    } else if (value < 0) {
        return `-${char}`;
    }

    return " 0";
}

function p(x: number, y: number): Point {
    return { x, y };
}

describe("scale", () => {
    type TestData =
        | [number, Scale, Scale, number]
        | [number, Scale, Scale, number, boolean];

    const TEST_DATA: TestData[] = [
        [80, [50, 100], [4, 8], 6.4],
        [80, [0, 100], [4, 8], 7.2],
        [-80, [-100, 0], [4, 8], 4.8],
        [-80, [-100, -50], [4, 8], 5.6],

        [80, [100, 50], [4, 8], 5.6],
        [80, [100, 0], [4, 8], 4.8],
        [-80, [0, -100], [4, 8], 7.2],
        [-80, [-50, -100], [4, 8], 6.4],

        [80, [50, 100], [8, 4], 5.6],
        [80, [0, 100], [8, 4], 4.8],
        [-80, [-100, 0], [8, 4], 7.2],
        [-80, [-100, -50], [8, 4], 6.4],

        [80, [100, 50], [8, 4], 6.4],
        [80, [100, 0], [8, 4], 7.2],
        [-80, [0, -100], [8, 4], 4.8],
        [-80, [-50, -100], [8, 4], 5.6],

        [80, [50, 100], [-4, -8], -6.4],
        [80, [0, 100], [-4, -8], -7.2],
        [-80, [-100, 0], [-4, -8], -4.8],
        [-80, [-100, -50], [-4, -8], -5.6],

        [80, [100, 50], [-4, -8], -5.6],
        [80, [100, 0], [-4, -8], -4.8],
        [-80, [0, -100], [-4, -8], -7.2],
        [-80, [-50, -100], [-4, -8], -6.4],

        [80, [50, 100], [-8, -4], -5.6],
        [80, [0, 100], [-8, -4], -4.8],
        [-80, [-100, 0], [-8, -4], -7.2],
        [-80, [-100, -50], [-8, -4], -6.4],

        [80, [100, 50], [-8, -4], -6.4],
        [80, [100, 0], [-8, -4], -7.2],
        [-80, [0, -100], [-8, -4], -4.8],
        [-80, [-50, -100], [-8, -4], -5.6],
    ];

    function scaleName([n, m]: Scale) {
        const swap = n > m;

        return `[${valueName(n, swap ? "m" : "n")}, ${valueName(m, swap ? "n" : "m")}]`;
    }

    for (const testData of TEST_DATA) {
        const [value, fromScale, toScale, expected, clamp] = testData;

        test(`${scaleName(fromScale)} -> ${scaleName(toScale)}`, () => {
            expect(
                scale(value, fromScale, toScale, { clamp: Boolean(clamp) })
            ).toBeCloseTo(expected);
        });
    }
});

describe("distance", () => {
    type TestData = [Point, Point, number];

    const TEST_DATA: TestData[] = [
        [p(0, 0), p(1, 1), Math.sqrt(2)],
        [p(0, 0), p(2, 3), Math.sqrt(13)],
        [p(0, 0), p(3, 2), Math.sqrt(13)],

        [p(0, 0), p(-1, -1), Math.sqrt(2)],
        [p(0, 0), p(-2, -3), Math.sqrt(13)],
        [p(0, 0), p(-3, -2), Math.sqrt(13)],
    ];

    function pointName(p: Point) {
        return `[${valueName(p.x, "x")}, ${valueName(p.y, "y")}]`;
    }

    function valueName(value: number, char: string) {
        if (value > 0) {
            return `+${char}`;
        } else if (value < 0) {
            return `-${char}`;
        }

        return " 0";
    }

    for (const testData of TEST_DATA) {
        const [point1, point2, expected] = testData;

        test(`${pointName(point1)} -> ${pointName(point2)}`, () => {
            expect(distance(point1, point2)).toBeCloseTo(expected);
        });
    }
});

describe("angleInRadians", () => {
    type TestData = [Point, Point, number];

    const TEST_DATA: TestData[] = [
        [p(0, 0), p(1, 1), 0.25 * Math.PI],
        [p(0, 0), p(3, 5), 1.03],
        [p(0, 0), p(-1, -1), 1.25 * Math.PI],
        [p(0, 0), p(-1, 0), Math.PI],
    ];

    function pointName(p: Point) {
        return `[${p.x}, ${p.y}]`;
    }

    for (const testData of TEST_DATA) {
        const [point1, point2, expected] = testData;

        test(`${pointName(point1)} -> ${pointName(point2)}`, () => {
            expect(angleInRadians(point1, point2)).toBeCloseTo(expected);
        });
    }
});

describe("angleInRadians", () => {
    type TestData = [Point, Point, number];

    const TEST_DATA: TestData[] = [
        [p(0, 0), p(1, 1), 0.25 * Math.PI],
        [p(0, 0), p(3, 5), 1.03],
        [p(0, 0), p(-1, -1), 1.25 * Math.PI],
        [p(0, 0), p(-1, 0), Math.PI],
    ];

    function pointName(p: Point) {
        return `[${p.x}, ${p.y}]`;
    }

    for (const testData of TEST_DATA) {
        const [point1, point2, expected] = testData;

        test(`${pointName(point1)} -> ${pointName(point2)}`, () => {
            expect(angleInRadians(point1, point2)).toBeCloseTo(expected);
        });
    }
});

describe("pointAtAngleAndDistance", () => {
    type TestData = [Point, number, number, Point];

    const TEST_DATA: TestData[] = [
        [p(0, 0), 0.25 * Math.PI, Math.sqrt(2), p(1, 1)],
        [p(0, 0), 1.03, Math.sqrt(34), p(3, 5)],
        [p(100, 200), 0.25 * Math.PI, Math.sqrt(2), p(101, 201)],
    ];

    function pointName(p: Point) {
        return `[${p.x}, ${p.y}]`;
    }

    for (const testData of TEST_DATA) {
        const [point, angle, distance, expected] = testData;

        test(`${pointName(point)}, ${angle.toFixed(3)} rad, ${distance} distance`, () => {
            expect(pointAtAngleAndDistance(point, angle, distance)).toEqual({
                x: expect.closeTo(expected.x) as number,
                y: expect.closeTo(expected.y) as number,
            });
        });
    }
});
