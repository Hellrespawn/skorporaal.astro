import type { CollectionEntry } from "astro:content";
import clsx from "clsx";

const DURATION_CLASS = "duration-100";

interface SkillProps {
    skill: CollectionEntry<"skills">;
    isHovering: boolean;
    isSelected: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export default function Skill({
    skill,
    isHovering,
    isSelected,
    onClick,
    onMouseEnter,
    onMouseLeave,
}: SkillProps) {
    const highlight = isHovering;

    return (
        <li
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            title={skill.data.name}
            className="relative flex h-24 w-24 cursor-pointer items-center-safe justify-center-safe md:w-28"
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
                    "absolute bottom-0 rounded-md px-1.25 transition-[backgroundColor,color,font-size,translate]",
                    DURATION_CLASS,
                    {
                        "bg-secondary-300/50 dark:bg-primary-400/50 py-px text-xs text-gray-800 dark:text-gray-50":
                            !isSelected,
                        "bg-secondary-300/95 dark:bg-primary-400/95 translate-x-6 translate-y-2 text-sm font-semibold text-gray-800":
                            isSelected,
                        "translate-x-6 translate-y-2": highlight,
                    }
                )}
            >
                {skill.data.name}
            </span>
        </li>
    );
}
