import cn from "classnames";

interface DotProps {
    bg: string;
    size?: string;
}

export default function Dot({ bg, size }: DotProps) {
    return (
        <span
            className={cn(
                bg,
                size ?? "h-2 w-2",
                "inline-block shrink-0 rounded-full"
            )}
        />
    );
}
