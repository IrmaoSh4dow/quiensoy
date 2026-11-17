import { PLAYER_ORDER, PLAYERS } from '../domain/players.ts';
import type { PlayerId } from '../domain/types.ts';

type PlayerSelectProps = {
  hasSavedCard: boolean;
  onChoose: (player: PlayerId) => void;
  onBack: () => void;
};

export function PlayerSelect({ hasSavedCard, onChoose, onBack }: PlayerSelectProps) {
  return (
    <section className="select">
      <p className="eyebrow">La mesa está puesta</p>
      <h1>¿Quién eres esta noche?</h1>
      <div className="select__grid">
        {PLAYER_ORDER.map((id) => {
          const player = PLAYERS[id];
          return (
            <button
              key={player.id}
              className="player-card"
              type="button"
              data-player={player.id}
              onClick={() => onChoose(player.id)}
            >
              <span className="player-card__initial" aria-hidden="true">
                {player.name.slice(0, 1)}
              </span>
              <span className="player-card__name">{player.name}</span>
              <span className="player-card__line">{player.line}</span>
            </button>
          );
        })}
      </div>
      {hasSavedCard ? (
        <p className="fine">
          Si eliges a la misma persona, recuperarás la carta que ya tenías en este dispositivo.
        </p>
      ) : null}
      <button className="text-button" type="button" onClick={onBack}>
        Volver
      </button>
    </section>
  );
}
