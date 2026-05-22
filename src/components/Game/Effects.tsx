import type { Effect } from '../../types/game';

interface EffectsProps {
  effects: Effect[];
}

export function Effects({ effects }: EffectsProps) {
  return (
    <div>
      {effects.map((effect) => (
        <EffectSprite key={effect.id} effect={effect} />
      ))}
    </div>
  );
}

interface EffectSpriteProps {
  effect: Effect;
}

function EffectSprite({ effect }: EffectSpriteProps) {
  const progress = effect.frame / effect.maxFrames;

  if (progress >= 1) {
    return null;
  }

  const style: React.CSSProperties = {
    position: 'absolute',
    left: effect.x - 20,
    top: effect.y - 20,
    width: 40,
    height: 40,
    pointerEvents: 'none',
    opacity: 1 - progress,
    transform: `scale(${0.5 + progress * 0.5})`,
  };

  if (effect.type === 'hit') {
    return (
      <div style={style}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="15" fill="#fff" opacity={0.8} />
          <polygon points="20,5 23,17 35,17 25,24 29,36 20,28 11,36 15,24 5,17 17,17" fill="#fbbf24" />
        </svg>
      </div>
    );
  }

  if (effect.type === 'defend') {
    return (
      <div style={style}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="5" y="5" width="30" height="30" fill="#00d9ff" opacity={0.6} />
          <rect x="10" y="10" width="20" height="20" fill="#fff" opacity={0.8} />
        </svg>
      </div>
    );
  }

  if (effect.type === 'victory') {
    return (
      <div
        style={{
          ...style,
          left: effect.x - 30,
          top: effect.y - 60,
          width: 60,
          height: 60,
          opacity: 1,
          transform: `translateY(${-progress * 40}px) scale(${1 + progress * 0.5})`,
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <polygon
            points="30,0 35,20 55,20 40,32 47,52 30,40 13,52 20,32 5,20 25,20"
            fill="#fbbf24"
          />
        </svg>
      </div>
    );
  }

  return null;
}
