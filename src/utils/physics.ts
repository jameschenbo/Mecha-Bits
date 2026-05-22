import { GAME_CONFIG } from './constants';
import type { Mech } from '../types/game';

export function updatePhysics(mech: Mech): Mech {
  let { x, y, velocityX, velocityY, facingRight } = mech;

  y += velocityY;
  velocityY += GAME_CONFIG.GRAVITY;

  if (y >= GAME_CONFIG.GROUND_Y) {
    y = GAME_CONFIG.GROUND_Y;
    velocityY = 0;
  }

  x += velocityX;

  if (x < 20) {
    x = 20;
    velocityX = 0;
  }
  if (x > GAME_CONFIG.FIELD_WIDTH - GAME_CONFIG.MECH_WIDTH - 20) {
    x = GAME_CONFIG.FIELD_WIDTH - GAME_CONFIG.MECH_WIDTH - 20;
    velocityX = 0;
  }

  if (velocityX > 0) {
    facingRight = true;
  } else if (velocityX < 0) {
    facingRight = false;
  }

  return {
    ...mech,
    x,
    y,
    velocityX,
    velocityY,
    facingRight,
  };
}

export function applyMovement(
  mech: Mech,
  controls: { left: boolean; right: boolean; up: boolean }
): Mech {
  let { velocityX, velocityY, x, y } = mech;

  if (controls.left) {
    velocityX = -GAME_CONFIG.MOVE_SPEED;
  } else if (controls.right) {
    velocityX = GAME_CONFIG.MOVE_SPEED;
  } else {
    velocityX = 0;
  }

  if (controls.up && y >= GAME_CONFIG.GROUND_Y - 1) {
    velocityY = GAME_CONFIG.JUMP_FORCE;
  }

  return {
    ...mech,
    velocityX,
    velocityY,
  };
}

export function checkCollision(mech1: Mech, mech2: Mech): boolean {
  return (
    mech1.x < mech2.x + GAME_CONFIG.MECH_WIDTH &&
    mech1.x + GAME_CONFIG.MECH_WIDTH > mech2.x &&
    mech1.y < mech2.y + GAME_CONFIG.MECH_HEIGHT &&
    mech1.y + GAME_CONFIG.MECH_HEIGHT > mech2.y
  );
}

export function getDistance(mech1: Mech, mech2: Mech): number {
  const center1X = mech1.x + GAME_CONFIG.MECH_WIDTH / 2;
  const center2X = mech2.x + GAME_CONFIG.MECH_WIDTH / 2;
  return Math.abs(center1X - center2X);
}
