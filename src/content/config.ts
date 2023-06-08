import { defineCollection } from 'astro:content';
import {
  portfolioSchema,
  recipeSchema,
  timelineSchema,
  skillSchema,
} from '../collection';

export const collections = {
  recipe: defineCollection({ type: 'content', schema: recipeSchema }),
  portfolio: defineCollection({ type: 'content', schema: portfolioSchema }),
  timeline: defineCollection({ type: 'content', schema: timelineSchema }),
  skills: defineCollection({ type: 'content', schema: skillSchema }),
};
