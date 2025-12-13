import type { CollectionEntry } from "astro:content";
import { useStore } from "@nanostores/react";
import { showRecipes } from "../stores/recipe.store";
import { SITE_DATA } from "../data";

interface RecipesWrapperProps {
    entries: CollectionEntry<"recipe">[];
}

export default function RecipesWrapper({ entries }: RecipesWrapperProps) {
    const $showRecipes = useStore(showRecipes);

    if (!$showRecipes) {
        return null;
    }

    return (
        <section className="px-2 md:my-8">
            <h2 className="frontpage-heading">Recipes</h2>
            <div className="prose-custom mx-auto max-w-[56ch]">
                <p>
                    If you're reading this, you are either inspecting the source
                    code or have found my little secret! 😉
                </p>
                <p>
                    I wanted an easily accessible place to keep my cookbook, and
                    this place serves as well as any other. Sadly, the recipes
                    are only available in Dutch, but let me know if you try them
                    at{" "}
                    <a href={`mailto:${SITE_DATA.email}`}>{SITE_DATA.email}</a>.
                </p>
            </div>

            <div className="prose-custom mx-auto">
                <ul>
                    {entries.map((entry) => (
                        <li key={entry.id}>
                            <a href={`/recipe/${entry.id}`}>
                                {entry.data.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
