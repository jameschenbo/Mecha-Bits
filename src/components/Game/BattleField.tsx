import { GAME_CONFIG, COLORS } from '../../utils/constants';
import { useEffect, useState } from 'react';

export function BattleField() {
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; opacity: number }>>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      x: Math.random() * GAME_CONFIG.FIELD_WIDTH,
      y: Math.random() * (GAME_CONFIG.GROUND_Y - 50),
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setStars(newStars);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: GAME_CONFIG.FIELD_WIDTH,
        height: GAME_CONFIG.FIELD_HEIGHT,
        backgroundColor: COLORS.BACKGROUND,
        overflow: 'hidden',
        border: '4px solid #000',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
      }}
    >
      {stars.map((star, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            backgroundColor: '#fff',
            opacity: star.opacity,
            animation: `twinkle ${1 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      <div
        style={{
          position: 'absolute',
          bottom: GAME_CONFIG.FIELD_HEIGHT - GAME_CONFIG.GROUND_Y,
          left: 0,
          right: 0,
          height: GAME_CONFIG.GROUND_Y + 20,
          background: `linear-gradient(to bottom, ${COLORS.GROUND_DECORATION} 0%, ${COLORS.GROUND} 100%)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            backgroundColor: COLORS.PLAYER1_PRIMARY,
            boxShadow: '0 0 10px rgba(233, 69, 96, 0.5)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 4,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: '#000',
            opacity: 0.3,
          }}
        />
      </div>

      <CitySilhouette />

      <div
        style={{
          position: 'absolute',
          bottom: GAME_CONFIG.FIELD_HEIGHT - GAME_CONFIG.GROUND_Y + 12,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '32px',
          fontWeight: 'bold',
          color: COLORS.ACCENT,
          textShadow: '2px 2px 0 #000, 0 0 10px rgba(244, 114, 182, 0.5)',
          fontFamily: 'monospace',
        }}
      >
        VS
      </div>
    </div>
  );
}

function CitySilhouette() {
  const buildings = [
    { x: 50, width: 60, height: 80 },
    { x: 120, width: 40, height: 120 },
    { x: 180, width: 80, height: 100 },
    { x: 300, width: 50, height: 140 },
    { x: 400, width: 70, height: 90 },
    { x: 500, width: 60, height: 130 },
    { x: 600, width: 80, height: 110 },
    { x: 700, width: 50, height: 100 },
  ];

  return (
    <div style={{ position: 'absolute', bottom: 80 }}>
      {buildings.map((building, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: building.x,
            bottom: 0,
            width: building.width,
            height: building.height,
            backgroundColor: COLORS.GROUND_DECORATION,
            opacity: 0.4,
          }}
        >
          {Array.from({ length: Math.floor(building.height / 15) }, (_, j) => (
            <div
              key={j}
              style={{
                position: 'absolute',
                top: j * 15 + 5,
                left: 5,
                width: 8,
                height: 8,
                backgroundColor: Math.random() > 0.3 ? '#fbbf24' : '#000',
                opacity: Math.random() > 0.3 ? 0.6 : 0,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
