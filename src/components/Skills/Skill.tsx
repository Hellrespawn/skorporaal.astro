import type { CollectionEntry } from "astro:content";
import clsx from "clsx";
import { useState } from "react";

const DURATION_CLASS = "duration-75";

interface SkillProps {
    skill: CollectionEntry<"skills">;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export default function Skill({
    skill,
    onMouseEnter,
    onMouseLeave,
}: SkillProps) {
    const [isHovering, setHovering] = useState(false);

    function handleMouseEnter() {
        setHovering(true);
        onMouseEnter();
    }

    function handleMouseLeave() {
        setHovering(false);
        onMouseLeave();
    }

    const highlight = isHovering;

    return (
        <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            title={skill.data.name}
            className="relative flex h-24 w-28 items-center-safe justify-center-safe"
        >
            <i
                className={clsx(
                    `transition-[font-size] devicon-${skill.data.icon}`,
                    DURATION_CLASS,
                    {
                        "text-icon-skills": !highlight,
                        "text-icon-skills-zoom": highlight,
                    }
                )}
            />
            <span
                className={clsx(
                    "absolute bottom-0 rounded-md px-[5px] transition-[backgroundColor,color,font-size,translate]",
                    DURATION_CLASS,
                    {
                        "bg-secondary-300/50 dark:bg-primary-400/50 py-px text-xs text-gray-800 dark:text-gray-50":
                            !highlight,
                        "bg-secondary-300/95 dark:bg-primary-400/95 translate-x-6 translate-y-2 text-sm text-gray-800":
                            highlight,
                    }
                )}
            >
                {skill.data.name}
            </span>
        </li>
    );
}
