import { PHASES, type MatchPhase } from '../game/phase.ts';

type StatusTrailProps = {
  phase: MatchPhase;
};

export function StatusTrail({ phase }: StatusTrailProps) {
  const currentIndex = PHASES.findIndex((item) => item.id === phase);

  return (
    <ol className="trail" aria-label="Estado de la partida">
      {PHASES.map((item, index) => {
        const state = index < currentIndex ? 'done' : index === currentIndex ? 'current' : 'upcoming';
        return (
          <li
            key={item.id}
            className={`trail__item trail__item--${state}`}
            aria-current={state === 'current' ? 'step' : undefined}
          >
            <span className="trail__mark" aria-hidden="true" />
            <span>{item.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
