import { GAME_CONFIG, COLORS } from '../../utils/constants';
import type { PlayerId } from '../../types/game';

interface HealthBarProps {
  playerId: PlayerId;
  health: number;
  maxHealth: number;
  name: string;
}

export function HealthBar({ playerId, health, maxHealth, name }: HealthBarProps) {
  const percentage = (health / maxHealth) * 100;

  let healthColor = COLORS.HEALTH_HIGH;
  if (percentage <= 30) {
    healthColor = COLORS.HEALTH_LOW;
  } else if (percentage <= 60) {
    healthColor = COLORS.HEALTH_MEDIUM;
  }

  const isPlayer1 = playerId === 'player1';

  return (
    <div
      className="pixel-border"
      style={{
        width: '240px',
        padding: '8px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <div
        style={{
          color: COLORS.TEXT,
          fontSize: '14px',
          fontWeight: 'bold',
          marginBottom: '4px',
          textShadow: '2px 2px 0 #000',
          textAlign: isPlayer1 ? 'left' : 'right',
        }}
      >
        {isPlayer1 ? '◄ ' : '► '}
        {name}
      </div>
      <div
        style={{
          width: '100%',
          height: '20px',
          backgroundColor: COLORS.HEALTH_BAR_BG,
          border: '2px solid #000',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: healthColor,
            transition: 'width 0.2s ease-out',
            boxShadow: `inset 0 -3px 0 rgba(0, 0, 0, 0.3)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '2px',
            left: '4px',
            right: '4px',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          }}
        />
      </div>
      <div
        style={{
          color: COLORS.TEXT,
          fontSize: '12px',
          marginTop: '4px',
          textAlign: isPlayer1 ? 'left' : 'right',
          fontFamily: 'monospace',
          textShadow: '1px 1px 0 #000',
        }}
      >
        HP: {health} / {maxHealth}
      </div>
    </div>
  );
}
