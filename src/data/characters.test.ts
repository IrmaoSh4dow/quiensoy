import { describe, expect, it } from 'vitest';
import { CATEGORIES } from './categories.ts';
import { characters } from './characters.ts';
import { CATEGORY_IDS } from '../domain/types.ts';

describe('biblioteca', () => {
  it('tiene una colección amplia, única y completa', () => {
    expect(characters.length).toBeGreaterThanOrEqual(200);

    const ids = characters.map((character) => character.id);
    const names = characters.map((character) => character.name);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(names).size).toBe(names.length);

    for (const character of characters) {
      expect(character.name.trim().length).toBeGreaterThan(0);
      expect(character.description.endsWith('.')).toBe(true);
      expect(character.description.length).toBeGreaterThan(8);
      expect(CATEGORY_IDS).toContain(character.category);
      expect(character.name).not.toBe('Luke');
      expect(character.name).not.toBe('Valentina');
      expect(character.description).not.toMatch(/PLACEHOLDER|Quitar/i);
      if (character.image) expect(character.image.startsWith('/')).toBe(true);
    }
  });

  it('cubre todas las categorías pedidas', () => {
    for (const category of CATEGORIES) {
      const count = characters.filter((character) => character.category === category.id).length;
      expect(count, category.label).toBeGreaterThanOrEqual(12);
    }
  });
});
