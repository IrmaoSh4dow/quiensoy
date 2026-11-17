import type { CategoryId } from '../domain/types.ts';

export const CATEGORIES: readonly { id: CategoryId; label: string }[] = [
  { id: 'anime', label: 'Anime' },
  { id: 'series', label: 'Series y televisión' },
  { id: 'movies', label: 'Películas y cine' },
  { id: 'actors', label: 'Actores y actrices' },
  { id: 'singers', label: 'Cantantes' },
  { id: 'musicians', label: 'Artistas musicales' },
  { id: 'games', label: 'Videojuegos' },
  { id: 'cartoons', label: 'Dibujos animados' },
  { id: 'celebrities', label: 'Celebridades' },
  { id: 'historical', label: 'Personajes históricos' },
  { id: 'pop', label: 'Cultura popular' },
  { id: 'disney', label: 'Personajes de Disney y Pixar' },
];

export function categoryLabel(id: CategoryId): string {
  return CATEGORIES.find((category) => category.id === id)?.label ?? id;
}
