import { useRef, type RefObject } from "react";

interface UseCanvasProps {
    width: number;
    height: number;
    context?: string;
}

type CanvasProps = React.DetailedHTMLProps<
    React.CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement
>;

interface UseCanvasUnloaded {
    refMounted: false;
    ref: RefObject<null>;
    props: CanvasProps;
    boundingBox: null;
    ctx: null;
}

interface UseCanvasLoaded {
    refMounted: true;
    ref: RefObject<HTMLCanvasElement>;
    props: CanvasProps;
    boundingBox: DOMRect;
    ctx: CanvasRenderingContext2D;
}

type UseCanvasResult = UseCanvasUnloaded | UseCanvasLoaded;

export function useCanvas({ width, height }: UseCanvasProps): UseCanvasResult {
    const ref = useRef<HTMLCanvasElement>(null);

    const refMounted = Boolean(ref.current);

    const boundingBox = ref.current?.getBoundingClientRect() ?? null;

    const props: CanvasProps = {
        width,
        height,
    };

    const ctx = ref.current?.getContext("2d") ?? null;

    return {
        ref,
        refMounted,
        boundingBox,
        props,
        ctx,
    } as UseCanvasResult;
}
