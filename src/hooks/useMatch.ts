import { useCallback, useState } from 'react';
import { characters, getCharacterById } from '../data/characters.ts';
import { rerollCharacter } from '../game/assign.ts';
import { derivePhase } from '../game/phase.ts';
import { createSession, type PrivateSession } from '../game/session.ts';
import type { PlayerId } from '../domain/types.ts';
import { loadPrivateSession, savePrivateSession } from '../storage/privateSession.ts';

export type Screen = 'welcome' | 'select' | 'room';

export function useMatch() {
  const [privateState, setPrivateState] = useState<PrivateSession | null>(() => loadPrivateSession());
  const [screen, setScreen] = useState<Screen>('welcome');

  const begin = useCallback(() => {
    setScreen('select');
  }, []);

  const choosePlayer = useCallback(
    (player: PlayerId) => {
      const next = createSession(player, characters, privateState);
      savePrivateSession(next);
      setPrivateState(next);
      setScreen('room');
    },
    [privateState],
  );

  const reroll = useCallback(() => {
    if (!privateState) return;
    const result = rerollCharacter(
      characters,
      privateState.player,
      privateState.characterId,
      privateState.rejectedIds,
    );
    const next: PrivateSession = {
      ...privateState,
      characterId: result.character.id,
      rejectedIds: result.rejectedIds,
      ready: false,
    };
    savePrivateSession(next);
    setPrivateState(next);
  }, [privateState]);

  const setReady = useCallback(
    (ready: boolean) => {
      if (!privateState) return;
      const next = { ...privateState, ready };
      savePrivateSession(next);
      setPrivateState(next);
    },
    [privateState],
  );

  const leave = useCallback(() => {
    setScreen('select');
  }, []);

  const backToWelcome = useCallback(() => {
    setScreen('welcome');
  }, []);

  return {
    screen,
    begin,
    choosePlayer,
    reroll,
    setReady,
    leave,
    backToWelcome,
    hasSavedCard: privateState !== null,
    session: privateState,
    character: privateState ? (getCharacterById(privateState.characterId) ?? null) : null,
    phase: derivePhase(privateState?.ready ?? false),
  };
}
