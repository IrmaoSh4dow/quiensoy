import { describe, expect, it } from 'vitest';
import { characters } from '../data/characters.ts';
import { assignInitial, deckFor, pickCharacter, rerollCharacter } from './assign.ts';
import { derivePhase } from './phase.ts';
import { createSession } from './session.ts';

describe('asignación', () => {
  it('no devuelve un personaje excluido', () => {
    const reserved = characters[0]?.id;
    expect(reserved).toBeTruthy();
    const picked = pickCharacter(characters, new Set([reserved!]), () => 0);
    expect(picked?.id).not.toBe(reserved);
  });

  it('cambia de carta y recuerda la anterior', () => {
    const first = deckFor('luke', characters)[0];
    expect(first).toBeTruthy();
    const result = rerollCharacter(characters, 'luke', first!.id, [], () => 0);
    expect(result.character.id).not.toBe(first!.id);
    expect(result.rejectedIds).toContain(first!.id);
    expect(deckFor('luke', characters).some((character) => character.id === result.character.id)).toBe(true);
  });

  it('sigue pudiendo cambiar cuando ya se rechazó casi todo el mazo', () => {
    const deck = deckFor('valentina', characters);
    const current = deck[0];
    expect(current).toBeTruthy();
    const rejected = deck.slice(1).map((character) => character.id);
    const result = rerollCharacter(characters, 'valentina', current!.id, rejected, () => 0);
    expect(result.character.id).not.toBe(current!.id);
  });

  it('reparte mazos distintos para que las dos cartas no coincidan', () => {
    const luke = new Set(deckFor('luke', characters).map((character) => character.id));
    const valentina = new Set(deckFor('valentina', characters).map((character) => character.id));
    expect(luke.size).toBeGreaterThan(80);
    expect(valentina.size).toBeGreaterThan(80);
    for (const id of luke) expect(valentina.has(id)).toBe(false);
    expect(luke.size + valentina.size).toBe(characters.length);

    for (let index = 0; index < 40; index += 1) {
      const left = assignInitial(characters, 'luke', Math.random);
      const right = assignInitial(characters, 'valentina', Math.random);
      expect(left.id).not.toBe(right.id);
      expect(luke.has(left.id)).toBe(true);
      expect(valentina.has(right.id)).toBe(true);
    }
  });

  it('conserva la carta si vuelve la misma persona y crea otra si cambia', () => {
    const previous = createSession('luke', characters, null);
    const again = createSession('luke', characters, previous);
    expect(again.characterId).toBe(previous.characterId);
    expect(again.ready).toBe(previous.ready);

    const switched = createSession('valentina', characters, previous);
    expect(switched.player).toBe('valentina');
    expect(switched.ready).toBe(false);
    expect(deckFor('valentina', characters).some((character) => character.id === switched.characterId)).toBe(
      true,
    );
  });
});

describe('fase de la partida', () => {
  it('pasa a partida en curso cuando esta persona confirma su carta', () => {
    expect(derivePhase(false)).toBe('reviewing');
    expect(derivePhase(true)).toBe('in_progress');
  });
});
