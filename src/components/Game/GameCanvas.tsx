import { useEffect, useRef } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useGameLoop } from '../../hooks/useGameLoop';
import { useResponsiveGame } from '../../hooks/useResponsiveGame';
import { useAIPlayer } from '../../hooks/useAIPlayer';
import { BattleField } from './BattleField';
import { Mech } from './Mech';
import { HealthBar } from './HealthBar';
import { Effects } from './Effects';
import { VirtualController } from '../UI/VirtualController';
import { GAME_CONFIG } from '../../utils/constants';

export function GameCanvas() {
  useKeyboard();
  useGameLoop();
  useResponsiveGame();
  useAIPlayer();
  const animationFrameRef = useRef<number>();
  const isMobile = window.innerWidth <= 768;

  const {
    mechs,
    effects,
    gameStatus,
    setEffects,
  } = useGameStore();

  useEffect(() => {
    if (gameStatus !== 'playing') {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    let currentEffects = effects;
    const updateEffects = () => {
      setEffects(prevEffects => {
        currentEffects = prevEffects
          .map(effect => ({ ...effect, frame: effect.frame + 1 }))
          .filter(effect => effect.frame < effect.maxFrames);
        return currentEffects;
      });

      animationFrameRef.current = requestAnimationFrame(updateEffects);
    };

    animationFrameRef.current = requestAnimationFrame(updateEffects);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameStatus, setEffects]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        padding: '20px',
        paddingBottom: isMobile ? '180px' : '20px',
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
          name="AI (铁壁)"
        />
      </div>

      <div style={{ position: 'relative' }}>
        <BattleField />
        <Mech mech={mechs.player1} />
        <Mech mech={mechs.player2} />
        <Effects effects={effects} />
      </div>

      {!isMobile && (
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
            玩家 (铁拳): A/D 移动 | W 跳跃 | F 攻击 | G 防御
          </div>
        </div>
      )}

      {isMobile && gameStatus === 'playing' && (
        <>
          <VirtualController playerId="player1" side="left" />
          <VirtualController playerId="player1" side="right" />
        </>
      )}
    </div>
  );
}

const COLORS = {
  PLAYER1_PRIMARY: '#e94560',
  PLAYER2_PRIMARY: '#00d9ff',
};
