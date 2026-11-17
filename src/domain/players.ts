import type { PlayerId } from './types.ts';

export const PLAYERS: Record<
  PlayerId,
  { id: PlayerId; name: string; line: string }
> = {
  luke: {
    id: 'luke',
    name: 'Luke',
    line: 'Juegas de este lado de la mesa.',
  },
  valentina: {
    id: 'valentina',
    name: 'Valentina',
    line: 'Juegas del otro lado de la mesa.',
  },
};

export const PLAYER_ORDER: readonly PlayerId[] = ['luke', 'valentina'];

export function partnerOf(player: PlayerId): PlayerId {
  return player === 'luke' ? 'valentina' : 'luke';
}
