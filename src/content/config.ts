import { defineCollection } from 'astro:content';
import {
  portfolioSchema,
  recipeSchema,
  timelineSchema,
  skillSchema,
} from '../collection';

const recipeCollection = defineCollection({ schema: recipeSchema });

const portfolioCollection = defineCollection({
  schema: portfolioSchema,
});

const timelineCollection = defineCollection({
  schema: timelineSchema,
});

const skillCollection = defineCollection({
  schema: skillSchema,
});

export const collections = {
  recipe: recipeCollection,
  portfolio: portfolioCollection,
  timeline: timelineCollection,
  skill: skillCollection,
};
