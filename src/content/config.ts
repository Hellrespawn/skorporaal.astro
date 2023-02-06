import { defineCollection } from 'astro:content';
import { postSchema } from '../collection';

const postCollection = defineCollection({ schema: postSchema });

export const collections = {
  post: postCollection,
};
