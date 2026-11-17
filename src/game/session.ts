import type { Character, PlayerId } from '../domain/types.ts';
import { assignInitial, deckFor } from './assign.ts';

export type PrivateSession = {
  player: PlayerId;
  characterId: string;
  rejectedIds: string[];
  ready: boolean;
};

export function createSession(
  player: PlayerId,
  library: readonly Character[],
  previous: PrivateSession | null,
): PrivateSession {
  const deck = deckFor(player, library);
  if (
    previous &&
    previous.player === player &&
    deck.some((character) => character.id === previous.characterId)
  ) {
    return {
      player,
      characterId: previous.characterId,
      rejectedIds: previous.rejectedIds.filter((id) => deck.some((character) => character.id === id)),
      ready: previous.ready,
    };
  }

  const character = assignInitial(library, player);
  return {
    player,
    characterId: character.id,
    rejectedIds: [],
    ready: false,
  };
}
