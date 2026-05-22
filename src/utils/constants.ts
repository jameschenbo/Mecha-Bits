export const GAME_CONFIG = {
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
