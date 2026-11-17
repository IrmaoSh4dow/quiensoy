import { partnerOf, PLAYERS } from '../domain/players.ts';
import type { Character, PlayerId } from '../domain/types.ts';
import type { MatchPhase } from '../game/phase.ts';
import { CharacterCard } from './CharacterCard.tsx';
import { PartnerPanel } from './PartnerPanel.tsx';
import { RulesHint } from './RulesHint.tsx';
import { StatusTrail } from './StatusTrail.tsx';

type GameRoomProps = {
  player: PlayerId;
  character: Character;
  phase: MatchPhase;
  ready: boolean;
  onReroll: () => void;
  onReady: (ready: boolean) => void;
  onLeave: () => void;
};

export function GameRoom({
  player,
  character,
  phase,
  ready,
  onReroll,
  onReady,
  onLeave,
}: GameRoomProps) {
  const partner = PLAYERS[partnerOf(player)];
  const you = PLAYERS[player];

  return (
    <section className="room">
      <header className="room__top">
        <div>
          <p className="eyebrow">Luke <span aria-hidden="true">·</span> Valentina</p>
          <h1>¿Quién soy?</h1>
          <p className="room__you">
            Esta noche eres <strong>{you.name}</strong>
          </p>
        </div>
        <StatusTrail phase={phase} />
      </header>

      <div className="room__grid">
        <CharacterCard character={character} onReroll={onReroll} />
        <PartnerPanel partnerName={partner.name} />
      </div>

      <div className="room__ready">
        <button
          className={ready ? 'button button--set' : 'button'}
          type="button"
          aria-pressed={ready}
          onClick={() => onReady(!ready)}
        >
          {ready ? 'Listo' : 'Estoy listo'}
        </button>
        <p className="fine">
          {ready
            ? `${partner.name} confirma en su propio teléfono.`
            : 'Confirma cuando reconozcas la carta. Esa señal se queda en este teléfono.'}
        </p>
      </div>

      <RulesHint />

      <footer className="room__foot">
        <button className="text-button" type="button" onClick={onLeave}>
          Cambiar de jugador
        </button>
      </footer>
    </section>
  );
}
