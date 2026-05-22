export interface Mech {
  id: 'player1' | 'player2';
  name: string;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  health: number;
  maxHealth: number;
  isDefending: boolean;
  isAttacking: boolean;
  isHit: boolean;
  facingRight: boolean;
  lastAttackTime: number;
  hitFlashEnd: number;
}

export interface Effect {
  id: string;
  type: 'hit' | 'defend' | 'victory' | 'attack';
  x: number;
  y: number;
  frame: number;
  maxFrames: number;
}

export interface Controls {
  left: boolean;
  right: boolean;
  up: boolean;
  attack: boolean;
  defend: boolean;
}

export type GameStatus = 'start' | 'playing' | 'ended';
export type PlayerId = 'player1' | 'player2';
