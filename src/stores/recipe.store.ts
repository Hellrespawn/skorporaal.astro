import { persistentAtom } from '@nanostores/persistent';

export const showRecipes = persistentAtom<boolean>('recipes', false, {
  encode: JSON.stringify,
  decode: JSON.parse,
});
