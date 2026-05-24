export const BASE_GAME_CONFIG = {
  FIELD_WIDTH: 800,
  FIELD_HEIGHT: 400,
  GROUND_Y: 320,

  MECH_WIDTH: 48,
  MECH_HEIGHT: 64,

  MOVE_SPEED: 5,
  JUMP_FORCE: -15,
  GRAVITY: 0.8,

  MAX_HEALTH: 100,
  ATTACK_DAMAGE_MIN: 10,
  ATTACK_DAMAGE_MAX: 15,
  ATTACK_RANGE: 60,
  ATTACK_COOLDOWN: 500,
  DEFENSE_REDUCTION: 0.7,

  PLAYER1_START_X: 150,
  PLAYER2_START_X: 600,
  START_Y: 256,
};

let currentScale = 1;
let currentConfig = { ...BASE_GAME_CONFIG };

export function updateGameScale(scale: number) {
  currentScale = scale;
  currentConfig = {
    ...BASE_GAME_CONFIG,
    FIELD_WIDTH: Math.floor(BASE_GAME_CONFIG.FIELD_WIDTH * scale),
    FIELD_HEIGHT: Math.floor(BASE_GAME_CONFIG.FIELD_HEIGHT * scale),
    GROUND_Y: Math.floor(BASE_GAME_CONFIG.GROUND_Y * scale),
    MECH_WIDTH: Math.floor(BASE_GAME_CONFIG.MECH_WIDTH * scale),
    MECH_HEIGHT: Math.floor(BASE_GAME_CONFIG.MECH_HEIGHT * scale),
    MOVE_SPEED: BASE_GAME_CONFIG.MOVE_SPEED * scale,
    JUMP_FORCE: BASE_GAME_CONFIG.JUMP_FORCE * scale,
    GRAVITY: BASE_GAME_CONFIG.GRAVITY * scale,
    ATTACK_RANGE: Math.floor(BASE_GAME_CONFIG.ATTACK_RANGE * scale),
    PLAYER1_START_X: Math.floor(BASE_GAME_CONFIG.PLAYER1_START_X * scale),
    PLAYER2_START_X: Math.floor(BASE_GAME_CONFIG.PLAYER2_START_X * scale),
    START_Y: Math.floor(BASE_GAME_CONFIG.START_Y * scale),
  };
}

export const GAME_CONFIG = {
  get FIELD_WIDTH() { return currentConfig.FIELD_WIDTH; },
  get FIELD_HEIGHT() { return currentConfig.FIELD_HEIGHT; },
  get GROUND_Y() { return currentConfig.GROUND_Y; },
  get MECH_WIDTH() { return currentConfig.MECH_WIDTH; },
  get MECH_HEIGHT() { return currentConfig.MECH_HEIGHT; },
  get MOVE_SPEED() { return currentConfig.MOVE_SPEED; },
  get JUMP_FORCE() { return currentConfig.JUMP_FORCE; },
  get GRAVITY() { return currentConfig.GRAVITY; },
  get MAX_HEALTH() { return currentConfig.MAX_HEALTH; },
  get ATTACK_DAMAGE_MIN() { return currentConfig.ATTACK_DAMAGE_MIN; },
  get ATTACK_DAMAGE_MAX() { return currentConfig.ATTACK_DAMAGE_MAX; },
  get ATTACK_RANGE() { return currentConfig.ATTACK_RANGE; },
  get ATTACK_COOLDOWN() { return currentConfig.ATTACK_COOLDOWN; },
  get DEFENSE_REDUCTION() { return currentConfig.DEFENSE_REDUCTION; },
  get PLAYER1_START_X() { return currentConfig.PLAYER1_START_X; },
  get PLAYER2_START_X() { return currentConfig.PLAYER2_START_X; },
  get START_Y() { return currentConfig.START_Y; },
  get SCALE() { return currentScale; },
};

export const CONTROLS = {
  player1: {
    left: 'KeyA',
    right: 'KeyD',
    up: 'KeyW',
    attack: 'KeyF',
    defend: 'KeyG',
  },
  player2: {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    up: 'ArrowUp',
    attack: 'KeyJ',
    defend: 'KeyK',
  },
};

export const COLORS = {
  BACKGROUND: '#1a1a2e',
  GROUND: '#16213e',
  GROUND_DECORATION: '#0f3460',

  PLAYER1_PRIMARY: '#e94560',
  PLAYER1_SECONDARY: '#f9b208',

  PLAYER2_PRIMARY: '#00d9ff',
  PLAYER2_SECONDARY: '#c0c0c0',

  HEALTH_BAR_BG: '#333333',
  HEALTH_HIGH: '#4ade80',
  HEALTH_MEDIUM: '#fbbf24',
  HEALTH_LOW: '#ef4444',

  TEXT: '#ffffff',
  ACCENT: '#f472b6',
};
