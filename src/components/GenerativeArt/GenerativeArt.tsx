"use client";

import * as React from "react";
import { useSpring } from "@react-spring/web";
import { styled } from "@linaria/react";

import {
    getDevicePixelRatio,
    getScaledCanvasProps,
} from "../../helpers/canvas.helpers";
import useRequestAnimationFrameLoop from "../../hooks/use-request-animation-frame-loop";
import useMousePositionWithinElement from "../../hooks/use-mouse-position-within-element";
import { normalize } from "../../utils";

// import { useColorMode } from "@/components/UserPreferencesProvider";

import draw from "./GenerativeArt.algorithm";

interface Props extends React.HTMLAttributes<HTMLCanvasElement> {
    width: number;
    height: number;
    lineWidth: number;
    lineLength: number;
    density: number;
    numOfRows: number;
    linecap: "round" | "square";
    shape: "line" | "circle" | "poly";
    springiness: number;
    devicePixelRatio: number;
    enableInteractiveFeatures: boolean;
    disableMouseTracking: boolean;
    isEditing: boolean;
}

function GenerativeArt({
    width,
    height,
    lineWidth,
    lineLength,
    density,
    numOfRows,
    linecap,
    shape,
    springiness,
    devicePixelRatio,
    enableInteractiveFeatures,
    disableMouseTracking,
    isEditing,
    ...delegated
}: Props) {
    const [mountAt] = React.useState(() => Date.now());
    const [isTrackingMouse, setIsTrackingMouse] = React.useState(false);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    const [mousePosition, canvasBox] = useMousePositionWithinElement(
        canvasRef,
        {
            buffer: shape === "line" ? 100 : 220,
            excludeTouchEvents: true,
            onEnterBox: () => {
                if (enableInteractiveFeatures) {
                    setIsTrackingMouse(true);
                }
            },
            onLeaveBox: () => {
                if (enableInteractiveFeatures) {
                    setIsTrackingMouse(false);
                }
            },
        }
    );

    const contextRef = React.useRef<CanvasRenderingContext2D | null>(null);

    const colorMode = "light";

    const hasBeenInitialized = React.useRef(false);

    React.useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        contextRef.current = canvasRef.current.getContext("2d");

        // When we first create the canvas, we need to scale it up to match the device pixel ratio. We only want to do this once, which is a problem with Strict Mode, and with Hot Reload. So we’ll track this in a ref, and skip the work if it’s already been performed.
        if (!hasBeenInitialized.current && contextRef.current) {
            contextRef.current.scale(devicePixelRatio, devicePixelRatio);
            hasBeenInitialized.current = true;
        }
    }, [devicePixelRatio]);

    const mousePositionSpring = useSpring({
        x: mousePosition.x || -1000,
        y: mousePosition.y || -1000,
        config: {
            tension: 300,
            friction: normalize(springiness, 0, 100, 50, 12) || 20,
        },
    });

    const mouseEnabledRatio = useSpring({
        value: isTrackingMouse && !disableMouseTracking ? 1 : 0,
    });
    const lightModeRatio = useSpring({
        value: colorMode === "light" ? 1 : 0,
    });

    useRequestAnimationFrameLoop(() => {
        const ENABLE_SPRING = true;

        draw({
            contextRef,
            mountAt,
            mouseEnabledRatio: mouseEnabledRatio.value?.get(),
            lightModeRatio: lightModeRatio.value?.get(),
            enableInteractiveFeatures,
            isEditing,
            mousePosition: ENABLE_SPRING
                ? {
                      x: mousePositionSpring.x?.get(),
                      y: mousePositionSpring.y?.get(),
                  }
                : {
                      x: mousePosition.x || -1000,
                      y: mousePosition.y || -1000,
                  },
            canvasBox,
            lineLength,
            lineWidth,
            density,
            numOfRows,
            linecap,
            shape,
            springiness,
        });
    });

    const scaledCanvasProps = getScaledCanvasProps(width, height);

    return (
        <Canvas
            ref={canvasRef}
            data-enable-interactive-features={String(enableInteractiveFeatures)}
            {...delegated}
            {...scaledCanvasProps}
        />
    );
}

const Canvas = styled.canvas`
    display: block;
    max-width: revert;

    /*
    For those who prefer reduced motion, they don't get the nice self-drawing enter animation. Instead, we'll fade the entire rainbow in.
  */
    @media (prefers-reduced-motion: reduce) {
        animation: fadeIn 600ms both;
        animation-delay: 400ms;
    }
`;

export default GenerativeArt;
