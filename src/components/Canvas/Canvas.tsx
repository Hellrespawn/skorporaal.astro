import { useCanvas } from "../../hooks/canvas";
import { useRelativeMousePosition } from "../../hooks/mouse-position";
import useRequestAnimationFrameLoop from "../../hooks/use-request-animation-frame-loop";
import { scale } from "../../util/math";

export default function Canvas() {
    const COLS = 16;
    const ROWS = 8;

    const { ref, refMounted, boundingBox, props, ctx } = useCanvas({
        width: 800,
        height: 600,
    });

    let string = "";

    const { position, getDistance, getPointTowardsCursor, getAngle } =
        useRelativeMousePosition(boundingBox, { delay: 75 });

    useRequestAnimationFrameLoop(() => {
        if (refMounted) {
            const xStep = boundingBox.width / COLS;
            const yStep = boundingBox.height / ROWS;

            ctx.clearRect(0, 0, boundingBox.width, boundingBox.height);

            for (let x = 0; x < COLS; x++) {
                for (let y = 0; y < ROWS; y++) {
                    const offsetX = xStep / 2 + x * xStep;
                    const offsetY = yStep / 2 + y * yStep;

                    const distance =
                        getDistance(offsetX, offsetY) ?? boundingBox.width;

                    const radius = scale(
                        distance,
                        [0, boundingBox.width / 1.5],
                        [xStep, 1],
                        {
                            clamp: true,
                        }
                    );

                    const angle = radius == 1 ? 0 : getAngle(offsetX, offsetY);

                    const start = getPointTowardsCursor(
                        offsetX,
                        offsetY,
                        radius / 2
                    );

                    const end = getPointTowardsCursor(
                        offsetX,
                        offsetY,
                        -(radius / 2)
                    );

                    if (x === 0 && y === 0) {
                        string = JSON.stringify(
                            {
                                position,
                                offsetX,
                                offsetY,
                                distance,
                                angle,
                                radius,
                                start,
                                end,
                            },
                            null,
                            2
                        );
                    }

                    ctx.beginPath();
                    ctx.lineWidth = scale(
                        distance,
                        [0, boundingBox.width],
                        [18, 1],
                        { clamp: true }
                    );

                    if (start && end) {
                        ctx.moveTo(start.x, start.y);
                        ctx.lineTo(end.x, end.y);
                        ctx.stroke();
                    }

                    // ctx.arc(offsetX, offsetY, radius, 0, 2 * Math.PI);
                    ctx.closePath();
                }
            }
        }
    });

    return (
        <div>
            <canvas className="m-4 border-1" ref={ref} {...props}></canvas>
            <pre>{string}</pre>
        </div>
    );
}
