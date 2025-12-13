import type { CollectionEntry } from "astro:content";
import { useOnClickOutside } from "usehooks-ts";
import { useRef, useState, type RefObject } from "react";
import Skill from "./Skill";

interface SkillsProps {
    skills: CollectionEntry<"skills">[];
}

export default function Skills({ skills }: SkillsProps) {
    const [isPlaying, setPlaying] = useState(true);
    const [tagline, setTagline] = useState<string | null>(null);
    const [selectedSkill, setSelectedSkill] =
        useState<CollectionEntry<"skills"> | null>(null);

    const ref = useRef<HTMLDivElement>(null);

    useOnClickOutside(
        ref as RefObject<HTMLDivElement>,
        () => selectedSkill && handleClick(selectedSkill)
    );

    function handleMouseEnter(skill: CollectionEntry<"skills">) {
        if (!selectedSkill) {
            setPlaying(false);
            setTagline(skill.data.tagline);
        }
    }

    function handleMouseLeave(_skill: CollectionEntry<"skills">) {
        if (!selectedSkill) {
            setPlaying(true);
            setTagline(null);
        }
    }

    function handleClick(skill: CollectionEntry<"skills">) {
        if (selectedSkill === skill) {
            setSelectedSkill(null);
            setPlaying(true);
        } else {
            setSelectedSkill(skill);
            setPlaying(false);
        }
    }

    return (
        <div className="mt-4 md:mt-4 md:mb-4">
            <h2 className="frontpage-heading mb-2 transition-all md:mb-4">
                Discover my skills
            </h2>
            <div ref={ref} className="relative overflow-hidden">
                <ul
                    className="animate-scroll flex h-28 w-max flex-row items-center"
                    style={{
                        animationPlayState: isPlaying ? undefined : "paused",
                    }}
                >
                    {[...skills, ...skills].map((skill, i) => (
                        <Skill
                            key={i}
                            skill={skill}
                            isSelected={skill == selectedSkill}
                            onClick={() => handleClick(skill)}
                            onMouseEnter={() => handleMouseEnter(skill)}
                            onMouseLeave={() => handleMouseLeave(skill)}
                        />
                    ))}
                </ul>
                <div className="skill-carousel-gradient pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-10"></div>
            </div>
            <div className="my-2 flex justify-center-safe text-sm md:text-base">
                {selectedSkill?.data.tagline ?? tagline ?? <>&nbsp;</>}
            </div>
        </div>
    );
}
