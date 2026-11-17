export type MatchPhase = 'reviewing' | 'in_progress';

export const PHASES: readonly { id: MatchPhase; label: string }[] = [
  { id: 'reviewing', label: 'Tu carta' },
  { id: 'in_progress', label: 'Partida en curso' },
];

export function derivePhase(ready: boolean): MatchPhase {
  return ready ? 'in_progress' : 'reviewing';
}
