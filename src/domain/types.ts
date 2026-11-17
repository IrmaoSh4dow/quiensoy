export const CATEGORY_IDS = [
  'anime',
  'series',
  'movies',
  'actors',
  'singers',
  'musicians',
  'games',
  'cartoons',
  'celebrities',
  'historical',
  'pop',
  'disney',
] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export type PlayerId = 'luke' | 'valentina';

export type Character = {
  id: string;
  name: string;
  description: string;
  category: CategoryId;
  universe?: string;
  image?: string;
};
