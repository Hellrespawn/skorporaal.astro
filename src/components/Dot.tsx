import clsx from "clsx";

interface DotProps {
    bg: string;
    size?: string;
}

export default function Dot({ bg, size }: DotProps) {
    return (
        <span
            className={clsx(
                bg,
                size ?? "h-2 w-2",
                "inline-block shrink-0 rounded-full"
            )}
        />
    );
}
