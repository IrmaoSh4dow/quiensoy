import { useState } from 'react';
import { categoryLabel } from '../data/categories.ts';
import { monogram } from '../domain/monogram.ts';
import type { Character } from '../domain/types.ts';

type CharacterCardProps = {
  character: Character;
  onReroll: () => void;
};

export function CharacterCard({ character, onReroll }: CharacterCardProps) {
  const universe =
    character.universe && !character.description.includes(character.universe)
      ? character.universe
      : null;

  return (
    <article className="panel panel--private" data-region="private">
      <header className="panel__heading">
        <p className="eyebrow">Tu personaje</p>
        <p className="seal">Privado</p>
      </header>
      <div key={character.id} className="deal">
        <Portrait character={character} />
        <div aria-live="polite">
          <h2>{character.name}</h2>
          <p className="description">{character.description}</p>
        </div>
        <p className="meta">
          {categoryLabel(character.category)}
          {universe ? ` · ${universe}` : null}
        </p>
      </div>
      <button className="button button--ghost" type="button" onClick={onReroll}>
        Cambiar personaje
      </button>
      <p className="fine">Si no lo reconoces, pide otro. Esta carta no sale de tu dispositivo.</p>
    </article>
  );
}

function Portrait({ character }: { character: Character }) {
  const [failed, setFailed] = useState(false);
  if (character.image && !failed) {
    return (
      <img
        className="portrait"
        src={character.image}
        alt=""
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className="monogram" data-category={character.category} aria-hidden="true">
      {monogram(character.name)}
    </div>
  );
}
