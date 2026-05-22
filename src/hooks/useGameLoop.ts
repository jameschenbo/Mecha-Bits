import { useEffect, useRef } from 'react';
import { useGameStore } from '../stores/gameStore';
import { applyMovement, updatePhysics } from '../utils/physics';
import { applyAttack, isInAttackRange } from '../utils/combat';
import type { PlayerId, Effect } from '../types/game';

export function useGameLoop() {
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  const {
    gameStatus,
    mechs,
    player1Controls,
    player2Controls,
    setMechs,
    addEffect,
    clearAttackFlags,
    clearHitFlags,
    setWinner,
  } = useGameStore();

  useEffect(() => {
    if (gameStatus !== 'playing') {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const gameLoop = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastTimeRef.current;

      if (deltaTime >= 16) {
        lastTimeRef.current = currentTime;

        let newMechs = { ...mechs };

        newMechs.player1 = applyMovement(newMechs.player1, player1Controls);
        newMechs.player1 = {
          ...newMechs.player1,
          isDefending: player1Controls.defend,
        };

        newMechs.player2 = applyMovement(newMechs.player2, player2Controls);
        newMechs.player2 = {
          ...newMechs.player2,
          isDefending: player2Controls.defend,
        };

        newMechs.player1 = updatePhysics(newMechs.player1);
        newMechs.player2 = updatePhysics(newMechs.player2);

        if (player1Controls.attack) {
          const result = applyAttack(
            newMechs.player1,
            newMechs.player2,
            currentTime
          );
          if (result.damage > 0) {
            newMechs.player1 = result.attacker;
            newMechs.player2 = result.defender;

            const effect: Effect = {
              id: `${currentTime}-hit-1`,
              type: newMechs.player2.isDefending ? 'defend' : 'hit',
              x: newMechs.player2.x + 24,
              y: newMechs.player2.y + 32,
              frame: 0,
              maxFrames: 20,
            };
            addEffect(effect);
          }
        }

        if (player2Controls.attack) {
          const result = applyAttack(
            newMechs.player2,
            newMechs.player1,
            currentTime
          );
          if (result.damage > 0) {
            newMechs.player2 = result.attacker;
            newMechs.player1 = result.defender;

            const effect: Effect = {
              id: `${currentTime}-hit-2`,
              type: newMechs.player1.isDefending ? 'defend' : 'hit',
              x: newMechs.player1.x + 24,
              y: newMechs.player1.y + 32,
              frame: 0,
              maxFrames: 20,
            };
            addEffect(effect);
          }
        }

        if (player1Controls.attack && isInAttackRange(newMechs.player1, newMechs.player2)) {
          const attackEffect: Effect = {
            id: `${currentTime}-attack-1`,
            type: 'attack',
            x: newMechs.player1.x + (newMechs.player1.facingRight ? 48 : -20),
            y: newMechs.player1.y + 20,
            frame: 0,
            maxFrames: 15,
          };
          addEffect(attackEffect);
        }

        if (player2Controls.attack && isInAttackRange(newMechs.player2, newMechs.player1)) {
          const attackEffect: Effect = {
            id: `${currentTime}-attack-2`,
            type: 'attack',
            x: newMechs.player2.x + (newMechs.player2.facingRight ? 48 : -20),
            y: newMechs.player2.y + 20,
            frame: 0,
            maxFrames: 15,
          };
          addEffect(attackEffect);
        }

        clearAttackFlags();
        clearHitFlags(currentTime);

        setMechs(newMechs);

        if (newMechs.player1.health <= 0) {
          setWinner('player2');
          const victoryEffect: Effect = {
            id: `${currentTime}-victory-2`,
            type: 'victory',
            x: newMechs.player2.x + 24,
            y: newMechs.player2.y,
            frame: 0,
            maxFrames: 60,
          };
          addEffect(victoryEffect);
          return;
        }

        if (newMechs.player2.health <= 0) {
          setWinner('player1');
          const victoryEffect: Effect = {
            id: `${currentTime}-victory-1`,
            type: 'victory',
            x: newMechs.player1.x + 24,
            y: newMechs.player1.y,
            frame: 0,
            maxFrames: 60,
          };
          addEffect(victoryEffect);
          return;
        }
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    gameStatus,
    mechs,
    player1Controls,
    player2Controls,
    setMechs,
    addEffect,
    clearAttackFlags,
    clearHitFlags,
    setWinner,
  ]);
}
