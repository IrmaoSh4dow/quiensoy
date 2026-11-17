const PARTICLES = [
  { left: '8%', top: '16%', delay: '0s', duration: '24s' },
  { left: '18%', top: '72%', delay: '3s', duration: '28s' },
  { left: '28%', top: '38%', delay: '7s', duration: '22s' },
  { left: '42%', top: '14%', delay: '1s', duration: '26s' },
  { left: '56%', top: '64%', delay: '5s', duration: '30s' },
  { left: '67%', top: '22%', delay: '8s', duration: '21s' },
  { left: '74%', top: '78%', delay: '2s', duration: '27s' },
  { left: '84%', top: '36%', delay: '6s', duration: '25s' },
  { left: '91%', top: '58%', delay: '4s', duration: '23s' },
  { left: '36%', top: '86%', delay: '9s', duration: '29s' },
  { left: '50%', top: '46%', delay: '11s', duration: '32s' },
  { left: '14%', top: '48%', delay: '13s', duration: '26s' },
];

export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__glow ambient__glow--wine" />
      <div className="ambient__glow ambient__glow--night" />
      <div className="ambient__glow ambient__glow--rose" />
      {PARTICLES.map((particle) => (
        <span
          key={`${particle.left}-${particle.top}`}
          className="ambient__particle"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
      <div className="ambient__grain" />
    </div>
  );
}
