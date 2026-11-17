type MarkProps = {
  size?: number;
};

export function Mark({ size = 72 }: MarkProps) {
  return (
    <svg className="mark" width={size} height={size} viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="28" cy="36" r="16" fill="none" stroke="currentColor" strokeWidth="1.15" />
      <circle cx="44" cy="36" r="16" fill="none" stroke="currentColor" strokeWidth="1.15" opacity="0.72" />
    </svg>
  );
}
