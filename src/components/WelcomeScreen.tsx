import { Mark } from './Mark.tsx';

type WelcomeScreenProps = {
  onBegin: () => void;
};

export function WelcomeScreen({ onBegin }: WelcomeScreenProps) {
  return (
    <section className="welcome">
      <Mark />
      <p className="eyebrow">Luke <span aria-hidden="true">·</span> Valentina</p>
      <h1>¿Quién soy?</h1>
      <p className="lede">
        Dos corazones, dos personajes y una sola misión: descubrir quién eres.
      </p>
      <button className="button" type="button" onClick={onBegin}>
        Comenzar
      </button>
    </section>
  );
}
