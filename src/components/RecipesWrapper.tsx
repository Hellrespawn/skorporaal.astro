import type { CollectionEntry } from "astro:content";
import { useStore } from "@nanostores/react";
import { showRecipes } from "../stores/recipe.store";

interface RecipesWrapperProps {
    entries: CollectionEntry<"recipe">[];
}

export default function RecipesWrapper({ entries }: RecipesWrapperProps) {
    const $showRecipes = useStore(showRecipes);

    if (!$showRecipes) {
        return null;
    }

    return (
        <section className="md:my-8">
            <h2 className="frontpage-heading">Recipes</h2>

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
