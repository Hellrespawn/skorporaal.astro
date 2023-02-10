<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import type { CollectionEntry } from 'astro:content';
import { showRecipes } from '../stores/recipe.store';

defineProps<{
  entries: CollectionEntry<'recipe'>[];
}>();

const $showRecipes = useStore(showRecipes);
</script>

<template>
  <section v-if="$showRecipes" class="md:my-8">
    <h2 class="frontpage-heading">Recipes</h2>

    <div class="prose-custom mx-auto">
      <ul>
        <li v-for="entry of entries" :key="entry.id">
          <a :href="`/recipe/${entry.slug}`">{{ entry.data.title }}</a>
        </li>
      </ul>
    </div>
  </section>
</template>
