import { defineCollection } from 'astro:content';
import {
  portfolioSchema,
  recipeSchema,
  timelineSchema,
  skillSchema,
} from '../collection';

export const collections = {
  recipe: defineCollection({ schema: recipeSchema }),
  portfolio: defineCollection({ schema: portfolioSchema }),
  timeline: defineCollection({ schema: timelineSchema }),
  skills: defineCollection({ schema: skillSchema }),
};
