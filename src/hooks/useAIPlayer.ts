import { useEffect, useRef } from 'react';
import { useGameStore } from '../stores/gameStore';
import { GAME_CONFIG } from '../utils/constants';

export function useAIPlayer() {
  const {
    gameStatus,
    mechs,
    setPlayer2Controls,
  } = useGameStore();

  const lastDecisionTime = useRef(0);
  const currentAction = useRef<{
    left: boolean;
    right: boolean;
    up: boolean;
    attack: boolean;
    defend: boolean;
  }>({
    left: false,
    right: false,
    up: false,
    attack: false,
    defend: false,
  });

  useEffect(() => {
    if (gameStatus !== 'playing') {
      setPlayer2Controls({
        left: false,
        right: false,
        up: false,
        attack: false,
        defend: false,
      });
      return;
    }

    const aiLoop = () => {
      const player = mechs.player1;
      const ai = mechs.player2;
      const currentTime = Date.now();

      if (currentTime - lastDecisionTime.current > 200) {
        lastDecisionTime.current = currentTime;
        const distance = Math.abs(player.x - ai.x);
        const facingPlayer = (player.x > ai.x && ai.facingRight) || 
                           (player.x < ai.x && !ai.facingRight);

        const newAction = {
          left: false,
          right: false,
          up: false,
          attack: false,
          defend: false,
        };

        if (player.isAttacking && distance < GAME_CONFIG.ATTACK_RANGE * 1.5) {
          newAction.defend = Math.random() > 0.3;
        }

        if (distance > GAME_CONFIG.ATTACK_RANGE * 0.8) {
          if (player.x > ai.x) {
            newAction.right = true;
          } else {
            newAction.left = true;
          }
        }

        if (distance > GAME_CONFIG.ATTACK_RANGE * 0.5 && 
            distance < GAME_CONFIG.ATTACK_RANGE * 2 && 
            Math.random() > 0.7) {
          newAction.up = true;
        }

        if (distance <= GAME_CONFIG.ATTACK_RANGE && facingPlayer && Math.random() > 0.4) {
          newAction.attack = true;
        }

        currentAction.current = newAction;
        setPlayer2Controls(newAction);
      }
    };

    const interval = setInterval(aiLoop, 100);
    return () => clearInterval(interval);
  }, [gameStatus, mechs, setPlayer2Controls]);
}
