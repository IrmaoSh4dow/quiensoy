import type { PlayerId } from '../domain/types.ts';
import type { PrivateSession } from '../game/session.ts';

const KEY = 'quien-soy.private.v1';

function readStorage(): Storage | null {
  try {
    if (typeof sessionStorage === 'undefined') return null;
    return sessionStorage;
  } catch {
    return null;
  }
}

function isPlayer(value: unknown): value is PlayerId {
  return value === 'luke' || value === 'valentina';
}

export function loadPrivateSession(): PrivateSession | null {
  const storage = readStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(KEY);
    if (!raw) return null;
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== 'object') return null;
    const record = data as Record<string, unknown>;
    if (!isPlayer(record.player)) return null;
    if (typeof record.characterId !== 'string' || record.characterId.length === 0) return null;
    if (!Array.isArray(record.rejectedIds)) return null;

    return {
      player: record.player,
      characterId: record.characterId,
      rejectedIds: record.rejectedIds.filter((id): id is string => typeof id === 'string'),
      ready: record.ready === true,
    };
  } catch {
    return null;
  }
}

export function savePrivateSession(session: PrivateSession): void {
  const storage = readStorage();
  if (!storage) return;
  try {
    storage.setItem(KEY, JSON.stringify(session));
  } catch {
    // La carta sigue en memoria durante esta visita.
  }
}
