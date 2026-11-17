import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { getCharacterById } from '../data/characters.ts';
import { GameRoom } from './GameRoom.tsx';

describe('privacidad de la carta', () => {
  it('muestra el personaje solo en la zona privada', () => {
    const character = getCharacterById('asta');
    expect(character).toBeTruthy();

    const html = renderToStaticMarkup(
      <GameRoom
        player="luke"
        character={character!}
        phase="reviewing"
        ready={false}
        onReroll={() => undefined}
        onReady={() => undefined}
        onLeave={() => undefined}
      />,
    );

    const privateHtml = html.slice(
      html.indexOf('data-region="private"'),
      html.indexOf('data-region="partner"'),
    );
    const partnerHtml = html.slice(html.indexOf('data-region="partner"'));

    expect(privateHtml).toContain('Asta');
    expect(privateHtml).toContain('Black Clover');
    expect(privateHtml).toContain('Cambiar personaje');
    expect(partnerHtml).not.toContain('Asta');
    expect(partnerHtml).not.toContain('Black Clover');
    expect(partnerHtml).toContain('Valentina');
    expect(partnerHtml).toContain('En su teléfono');
    expect(html).toContain('Haz preguntas que puedan responderse con sí o no.');
    expect(html.match(/aria-current="step"/g)).toHaveLength(1);
    const currentStep = html.slice(html.indexOf('aria-current="step"'), html.indexOf('aria-current="step"') + 220);
    expect(currentStep).toContain('Tu carta');
  });
});
