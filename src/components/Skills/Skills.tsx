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

    function handleMouseEnter(skill: CollectionEntry<"skills">) {
        setPlaying(false);
        setTagline(skill.data.tagline);
    }

    function handleMouseLeave(_skill: CollectionEntry<"skills">) {
        setPlaying(true);
        setTagline(null);
    }

    return (
        <div className="mt-4 md:mt-4 md:mb-4">
            <h2 className="frontpage-heading transition-all">
                Discover my skills
            </h2>
            <div className="relative overflow-hidden">
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
                            onMouseEnter={() => handleMouseEnter(skill)}
                            onMouseLeave={() => handleMouseLeave(skill)}
                        />
                    ))}
                </ul>
                <div className="skill-carousel-gradient pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-10"></div>
            </div>
            <div className="my-2 flex justify-center-safe">
                {tagline ?? <>&nbsp;</>}
            </div>
        </div>
    );
}
