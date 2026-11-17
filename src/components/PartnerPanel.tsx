type PartnerPanelProps = {
  partnerName: string;
};

export function PartnerPanel({ partnerName }: PartnerPanelProps) {
  return (
    <article className="panel panel--partner" data-region="partner">
      <header className="panel__heading">
        <p className="eyebrow">Tu pareja</p>
        <p className="seal seal--quiet">En su teléfono</p>
      </header>
      <div className="veil" aria-hidden="true">
        <span>{partnerName.slice(0, 1)}</span>
      </div>
      <h2>{partnerName}</h2>
      <p className="description">
        Abre esta misma página y recibe su propia carta. Aquí no aparece.
      </p>
      <p className="fine">Cada quien guarda su personaje en su navegador.</p>
    </article>
  );
}
