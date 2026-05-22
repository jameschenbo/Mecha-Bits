import { GAME_CONFIG } from './constants';
import type { Mech } from '../types/game';

export function calculateDamage(
  isDefending: boolean,
  damage: number
): number {
  if (isDefending) {
    return Math.floor(damage * (1 - GAME_CONFIG.DEFENSE_REDUCTION));
  }
  return damage;
}

export function canAttack(mech: Mech, currentTime: number): boolean {
  return currentTime - mech.lastAttackTime >= GAME_CONFIG.ATTACK_COOLDOWN;
}

export function generateDamage(): number {
  return (
    Math.floor(
      Math.random() * (GAME_CONFIG.ATTACK_DAMAGE_MAX - GAME_CONFIG.ATTACK_DAMAGE_MIN + 1)
    ) + GAME_CONFIG.ATTACK_DAMAGE_MIN
  );
}

export function isInAttackRange(
  attacker: Mech,
  defender: Mech
): boolean {
  const centerAttackerX = attacker.x + GAME_CONFIG.MECH_WIDTH / 2;
  const centerDefenderX = defender.x + GAME_CONFIG.MECH_WIDTH / 2;
  const distance = Math.abs(centerAttackerX - centerDefenderX);

  const facingCorrect =
    (attacker.facingRight && defender.x > attacker.x) ||
    (!attacker.facingRight && defender.x < attacker.x);

  return distance <= GAME_CONFIG.ATTACK_RANGE && facingCorrect;
}

export function applyAttack(
  attacker: Mech,
  defender: Mech,
  currentTime: number
): { attacker: Mech; defender: Mech; damage: number } {
  if (!canAttack(attacker, currentTime)) {
    return { attacker, defender, damage: 0 };
  }

  if (!isInAttackRange(attacker, defender)) {
    return { attacker, defender, damage: 0 };
  }

  const baseDamage = generateDamage();
  const actualDamage = calculateDamage(defender.isDefending, baseDamage);

  const newDefenderHealth = Math.max(0, defender.health - actualDamage);

  return {
    attacker: {
      ...attacker,
      lastAttackTime: currentTime,
      isAttacking: true,
    },
    defender: {
      ...defender,
      health: newDefenderHealth,
      isHit: true,
      hitFlashEnd: currentTime + 200,
    },
    damage: actualDamage,
  };
}
