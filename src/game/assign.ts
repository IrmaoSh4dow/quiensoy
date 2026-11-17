import type { Character, PlayerId } from '../domain/types.ts';

function ownerOf(id: string): PlayerId {
  let hash = 2166136261;
  for (let index = 0; index < id.length; index += 1) {
    hash ^= id.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) % 2 === 0 ? 'luke' : 'valentina';
}

/** Cada jugador tiene un mazo propio. Así las dos cartas nunca coinciden, sin conectar los teléfonos. */
export function deckFor(player: PlayerId, library: readonly Character[]): Character[] {
  return library.filter((character) => ownerOf(character.id) === player);
}

export function pickCharacter(
  library: readonly Character[],
  exclude: ReadonlySet<string>,
  rng: () => number = Math.random,
): Character | null {
  const pool = library.filter((character) => !exclude.has(character.id));
  if (pool.length === 0) return null;
  const raw = rng();
  const index = Math.min(pool.length - 1, Math.max(0, Math.floor(raw * pool.length)));
  return pool[index] ?? null;
}

export function assignInitial(
  library: readonly Character[],
  player: PlayerId,
  rng: () => number = Math.random,
): Character {
  const character = pickCharacter(deckFor(player, library), new Set(), rng);
  if (!character) throw new Error('No hay personajes disponibles.');
  return character;
}

export function rerollCharacter(
  library: readonly Character[],
  player: PlayerId,
  currentId: string,
  rejectedIds: readonly string[],
  rng: () => number = Math.random,
): { character: Character; rejectedIds: string[] } {
  const deck = deckFor(player, library);
  const withCurrent = [...rejectedIds, currentId];
  const next = pickCharacter(deck, new Set(withCurrent), rng);
  if (next) return { character: next, rejectedIds: withCurrent };

  const fallback = pickCharacter(deck, new Set([currentId]), rng);
  if (!fallback) throw new Error('No hay otro personaje disponible.');
  return { character: fallback, rejectedIds: [currentId] };
}
