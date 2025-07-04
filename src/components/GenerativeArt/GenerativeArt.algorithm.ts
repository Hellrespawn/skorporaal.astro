import { normalize, clampedNormalize, wrapCircularValue } from "../../utils";
// import type { GenerativeArtValues } from "@/types/art.types";

interface GenerativeArtValues {
      lineWidth: number,
    lineLength: number,
    density: number,
    numOfRows: number,
    linecap: CanvasLineCap,
    shape: string,
}

interface Inputs extends GenerativeArtValues {
    contextRef: React.RefObject<CanvasRenderingContext2D>;
    mountAt: number;
    mouseEnabledRatio: number;
    lightModeRatio: number;
    enableInteractiveFeatures: boolean;
    isEditing: boolean;
    mousePosition: { x: number; y: number };
    canvasBox: DOMRect | null;
}

// IDEA: For pride month next year, maybe I could do something with the colors... Like, imagine if the ROYGBIV spectrum was based on teh distance to the cursor! Or maybe it could be based on the index of each point in its layer, rather than the layer number?

const LINE_COLORS = {
    light: [
        [340, 100, 50],
        [340, 100, 50],
        [310, 100, 40],
        [310, 100, 40],
        [270, 100, 40],
        [270, 100, 40],
        [240, 100, 30],
        [240, 100, 30],
        [230, 100, 20],
        [230, 100, 20],
    ],
    dark: [
        [350, 100, 55],
        [350, 100, 55],
        [50, 100, 50],
        [50, 100, 50],
        [150, 100, 50],
        [150, 100, 50],
        [240, 100, 70],
        [240, 100, 70],
        [270, 100, 80],
        [270, 100, 80],
    ],
};

const DRAW_ALIGNMENT_LINE = false;
const ENTER_ANIMATION_TIME = 2000;

export default function draw({
    contextRef,
    mountAt,
    mouseEnabledRatio,
    lightModeRatio,
    enableInteractiveFeatures,
    isEditing,
    mousePosition,
    canvasBox,
    lineWidth: inputLineWidth,
    lineLength: inputLineLength,
    density,
    numOfRows,
    linecap,
    shape,
}: Inputs) {
    const ctx = contextRef.current;

    if (!canvasBox || !ctx) {
        return;
    }

    // Wait a short amount of time before starting the enter animation.
    const startTimeOffset = 200;
    const timeSinceMount = Date.now() - (mountAt + startTimeOffset);
    const mode =
        timeSinceMount < ENTER_ANIMATION_TIME && enableInteractiveFeatures
            ? "enter"
            : "default";

    ctx.clearRect(0, 0, canvasBox.width, canvasBox.height);

    const pointDistance = normalize(density, 0, 100, 450, 115);

    const centerYMultiplier = normalize(numOfRows, 3, 10, 1.2, 1.325);
    const rainbowCenterX = canvasBox.width * 0.5;
    const rainbowCenterY = canvasBox.height * centerYMultiplier;
    const innerRadius = canvasBox.width * 0.4;

    const maxLineWidth = shape === "line" ? 18 : 25;

    const lineWidth = normalize(inputLineWidth, -1, 1, maxLineWidth, 2);
    const lineLength = normalize(inputLineLength, -1, 1, 4, 40);

    ctx.lineWidth = lineWidth;
    ctx.lineCap = linecap;

    for (let layer = 0; layer < numOfRows; layer++) {
        const radius = innerRadius + 100 * layer * 0.1575;
        const angleDeltaBetweenPoints = pointDistance / (2 * Math.PI * radius);

        const startAngle = Math.PI;

        // A full circle would be 2π, but we only need to do the top half. The rest is off-canvas / obscured by clouds.
        const endAngle = 2 * Math.PI;

        ctx.strokeStyle = calculateLayerColor(layer, numOfRows, lightModeRatio);

        for (
            let angle = startAngle;
            angle < endAngle;
            angle += angleDeltaBetweenPoints
        ) {
            if (mode === "enter") {
                const angleRatio = normalize(angle, startAngle, endAngle, 0, 1);
                const timeRatio = normalize(
                    timeSinceMount,
                    0,
                    ENTER_ANIMATION_TIME,
                    0,
                    1
                );

                if (angleRatio > timeRatio) {
                    continue;
                }
            }

            const centerX = rainbowCenterX + radius * Math.cos(angle);
            const centerY = rainbowCenterY + radius * Math.sin(angle);

            const mouseDeltaX = mousePosition.x - centerX;
            const mouseDeltaY = mousePosition.y - centerY;

            let mouseAngle = Math.atan2(mouseDeltaY, mouseDeltaX);
            let perpendicularAngle = angle + Math.PI * 0.5;
            perpendicularAngle = wrapCircularValue(
                perpendicularAngle,
                -Math.PI,
                Math.PI
            );

            if (mouseDeltaX > 0) {
                mouseAngle -= Math.PI;
            }

            mouseAngle = wrapCircularValue(
                mouseAngle - Math.PI,
                -Math.PI,
                Math.PI
            );

            switch (shape) {
                // This is the modern new mode, where the lines form a rainbow and tilt universally towards the mouse.
                case "line": {
                    // During the initial mount animation, we ignore mouse position. Afterwards, we'll mix the mouse position and the default rainbow position based on `mouseEnabledRatio`.
                    const mixedAngle = mixAngles(
                        perpendicularAngle,
                        mouseAngle,
                        mouseEnabledRatio
                    );

                    const halfLength = lineLength * 0.5;

                    const deltaX = halfLength * Math.cos(mixedAngle);
                    const deltaY = halfLength * Math.sin(mixedAngle);

                    const [p1, p2] = [
                        {
                            x: centerX - deltaX,
                            y: centerY - deltaY,
                        },
                        {
                            x: centerX + deltaX,
                            y: centerY + deltaY,
                        },
                    ];

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                    ctx.closePath();
                    break;
                }

                // This is the 'classic' mode where the lines shrink into a circle based on the distance to the cursor.
                case "circle": {
                    // When the edit panel is open, we want to glide the mouse to a specific position near the panel. This is for two reasons:
                    // 1. It's distracting if the art is being interacted with as the user drags sliders or whatever
                    // 2. We still want to see the effect of all of the controls, which is only possible if the "cursor" is within range of the art.
                    let effectiveMousePosition = mousePosition;

                    if (isEditing) {
                        const artificialMousePosition = {
                            x: canvasBox.width * 0.2,
                            y: canvasBox.height * 0.5,
                        };

                        effectiveMousePosition = {
                            x: clampedNormalize(
                                mouseEnabledRatio,
                                0,
                                1,
                                artificialMousePosition.x,
                                mousePosition.x
                            ),
                            y: clampedNormalize(
                                mouseEnabledRatio,
                                0,
                                1,
                                artificialMousePosition.y,
                                mousePosition.y
                            ),
                        };
                    }

                    const mouseDeltaX = effectiveMousePosition.x - centerX;
                    const mouseDeltaY = effectiveMousePosition.y - centerY;

                    const distance = Math.sqrt(
                        mouseDeltaX ** 2 + mouseDeltaY ** 2
                    );

                    const radius = lineLength * 0.5;

                    const deltaX = centerX - effectiveMousePosition.x;
                    const deltaY = centerY - effectiveMousePosition.y;

                    const hypRatio = radius / distance;

                    const xRatio = deltaX * hypRatio;
                    const yRatio = deltaY * hypRatio;

                    let p1, p2;

                    // With circles, the angle doesn't matter at all, but if the user changes the shape to square, we want the squares to be neatly aligned when they're not under the mouse's influence.
                    const isWithinMouseInfluence = distance <= 300;
                    if (isWithinMouseInfluence) {
                        const dampenBy = clampedNormalize(
                            distance,
                            0,
                            300,
                            1,
                            0
                        );

                        p1 = {
                            x: centerX - xRatio * dampenBy,
                            y: centerY - yRatio * dampenBy,
                        };
                        p2 = {
                            x: centerX + xRatio * dampenBy,
                            y: centerY + yRatio * dampenBy,
                        };
                    } else {
                        // We'll use the `perpendicularAngle` to make the squares line up nicely. Essentially the same logic here as with `line` mode.
                        const length = 0.01;
                        const deltaX = length * Math.cos(perpendicularAngle);
                        const deltaY = length * Math.sin(perpendicularAngle);

                        [p1, p2] = [
                            {
                                x: centerX - deltaX,
                                y: centerY - deltaY,
                            },
                            {
                                x: centerX + deltaX,
                                y: centerY + deltaY,
                            },
                        ];
                    }

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                    ctx.closePath();
                    break;
                }
            }
        }
    }

    // This is a helpful design-tool thingy, to align the canvas with JoshMascot or whatever else.
    if (DRAW_ALIGNMENT_LINE) {
        ctx.beginPath();
        ctx.moveTo(canvasBox.width / 2, 0);
        ctx.lineTo(canvasBox.width / 2, canvasBox.height);
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.closePath();
    }
}

function calculateLayerColor(
    layer: number,
    numOfRows: number,
    lightModeRatio: number
) {
    // If we have 8 rows, we’ll only use the first 8 colors, omitting the nice purple.
    const maxNumOfColors = numOfRows === 8 ? 8 : 10;

    const colorIndex = Math.floor(
        normalize(layer, 0, numOfRows, 0, maxNumOfColors)
    );

    const h =
        Math.round(
            normalize(
                lightModeRatio,
                1,
                0,
                LINE_COLORS.light[colorIndex][0] + 360,
                LINE_COLORS.dark[colorIndex][0] + 360
            )
        ) - 360;

    const s = normalize(
        lightModeRatio,
        1,
        0,
        LINE_COLORS.light[colorIndex][1],
        LINE_COLORS.dark[colorIndex][1]
    );
    const l = normalize(
        lightModeRatio,
        1,
        0,
        LINE_COLORS.light[colorIndex][2],
        LINE_COLORS.dark[colorIndex][2]
    );

    return `hsl(${h}deg ${s}% ${l}%)`;
}

function mixAngles(angle1: number, angle2: number, ratio: number) {
    const normalizedAngle1 = normalize(angle1, -Math.PI, Math.PI, 0, 100);
    const normalizedAngle2 = normalize(angle2, -Math.PI, Math.PI, 0, 100);

    const normalizedMixed =
        normalizedAngle1 * (1 - ratio) + normalizedAngle2 * ratio;

    return normalize(normalizedMixed, 0, 100, -Math.PI, Math.PI);
}
