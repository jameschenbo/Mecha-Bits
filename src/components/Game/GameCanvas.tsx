import { useEffect } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useGameLoop } from '../../hooks/useGameLoop';
import { BattleField } from './BattleField';
import { Mech } from './Mech';
import { HealthBar } from './HealthBar';
import { Effects } from './Effects';
import { GAME_CONFIG } from '../../utils/constants';

export function GameCanvas() {
  useKeyboard();
  useGameLoop();

  const { mechs, effects, removeEffect, gameStatus } = useGameStore();

  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const interval = setInterval(() => {
      effects.forEach((effect) => {
        const updatedEffect = { ...effect, frame: effect.frame + 1 };
        if (updatedEffect.frame >= updatedEffect.maxFrames) {
          removeEffect(effect.id);
        }
      });
    }, 16);

    return () => clearInterval(interval);
  }, [effects, removeEffect, gameStatus]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        padding: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: GAME_CONFIG.FIELD_WIDTH,
        }}
      >
        <HealthBar
          playerId="player1"
          health={mechs.player1.health}
          maxHealth={mechs.player1.maxHealth}
          name={mechs.player1.name}
        />
        <HealthBar
          playerId="player2"
          health={mechs.player2.health}
          maxHealth={mechs.player2.maxHealth}
          name={mechs.player2.name}
        />
      </div>

      <div style={{ position: 'relative' }}>
        <BattleField />
        <Mech mech={mechs.player1} />
        <Mech mech={mechs.player2} />
        <Effects effects={effects} onEffectComplete={removeEffect} />
      </div>

      <div
        className="pixel-border"
        style={{
          padding: '12px 20px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          fontSize: '14px',
          fontFamily: 'monospace',
          textAlign: 'center',
          lineHeight: '1.8',
        }}
      >
        <div style={{ color: COLORS.PLAYER1_PRIMARY, fontWeight: 'bold' }}>
          玩家1 (铁拳): A/D 移动 | W 跳跃 | F 攻击 | G 防御
        </div>
        <div style={{ color: COLORS.PLAYER2_PRIMARY, fontWeight: 'bold', marginTop: '4px' }}>
          玩家2 (铁壁): ←/→ 移动 | ↑ 跳跃 | J 攻击 | K 防御
        </div>
      </div>
    </div>
  );
}

const COLORS = {
  PLAYER1_PRIMARY: '#e94560',
  PLAYER2_PRIMARY: '#00d9ff',
};
