import { create } from 'zustand';
import { GAME_CONFIG } from '../utils/constants';
import type { Mech, Effect, GameStatus, PlayerId, Controls } from '../types/game';

interface GameStore {
  gameStatus: GameStatus;
  winner: PlayerId | null;
  mechs: {
    player1: Mech;
    player2: Mech;
  };
  effects: Effect[];
  player1Controls: Controls;
  player2Controls: Controls;

  startGame: () => void;
  resetGame: () => void;
  updateMech: (id: PlayerId, updates: Partial<Mech>) => void;
  setMechs: (mechs: { player1: Mech; player2: Mech }) => void;
  addEffect: (effect: Effect) => void;
  removeEffect: (id: string) => void;
  setEffects: (effects: Effect[] | ((prev: Effect[]) => Effect[])) => void;
  clearEffects: () => void;
  setPlayer1Controls: (controls: Partial<Controls>) => void;
  setPlayer2Controls: (controls: Partial<Controls>) => void;
  setGameStatus: (status: GameStatus) => void;
  setWinner: (winner: PlayerId | null) => void;
  clearAttackFlags: () => void;
  clearHitFlags: (currentTime: number) => void;
}

export const createInitialMech = (
  id: 'player1' | 'player2',
  x?: number
): Mech => ({
  id,
  name: id === 'player1' ? 'Iron Fist' : 'Iron Wall',
  x: x ?? (id === 'player1' ? GAME_CONFIG.PLAYER1_START_X : GAME_CONFIG.PLAYER2_START_X),
  y: GAME_CONFIG.START_Y,
  velocityX: 0,
  velocityY: 0,
  health: GAME_CONFIG.MAX_HEALTH,
  maxHealth: GAME_CONFIG.MAX_HEALTH,
  isDefending: false,
  isAttacking: false,
  isHit: false,
  facingRight: id === 'player1',
  lastAttackTime: 0,
  hitFlashEnd: 0,
});

export const useGameStore = create<GameStore>((set) => ({
  gameStatus: 'start',
  winner: null,
  mechs: {
    player1: createInitialMech('player1', GAME_CONFIG.PLAYER1_START_X),
    player2: createInitialMech('player2', GAME_CONFIG.PLAYER2_START_X),
  },
  effects: [],
  player1Controls: {
    left: false,
    right: false,
    up: false,
    attack: false,
    defend: false,
  },
  player2Controls: {
    left: false,
    right: false,
    up: false,
    attack: false,
    defend: false,
  },

  startGame: () =>
    set({
      gameStatus: 'playing',
      winner: null,
      mechs: {
        player1: createInitialMech('player1'),
        player2: createInitialMech('player2'),
      },
      effects: [],
    }),

  resetGame: () =>
    set({
      gameStatus: 'start',
      winner: null,
      mechs: {
        player1: createInitialMech('player1'),
        player2: createInitialMech('player2'),
      },
      effects: [],
      player1Controls: {
        left: false,
        right: false,
        up: false,
        attack: false,
        defend: false,
      },
      player2Controls: {
        left: false,
        right: false,
        up: false,
        attack: false,
        defend: false,
      },
    }),

  updateMech: (id, updates) =>
    set((state) => ({
      mechs: {
        ...state.mechs,
        [id]: {
          ...state.mechs[id],
          ...updates,
        },
      },
    })),

  setMechs: (mechs) => set({ mechs }),

  addEffect: (effect) =>
    set((state) => ({
      effects: [...state.effects, effect],
    })),

  removeEffect: (id) =>
    set((state) => ({
      effects: state.effects.filter((e) => e.id !== id),
    })),

  setEffects: (effects) => set((state) => ({ 
    effects: typeof effects === 'function' ? effects(state.effects) : effects 
  })),

  clearEffects: () => set({ effects: [] }),

  setPlayer1Controls: (controls) =>
    set((state) => ({
      player1Controls: {
        ...state.player1Controls,
        ...controls,
      },
    })),

  setPlayer2Controls: (controls) =>
    set((state) => ({
      player2Controls: {
        ...state.player2Controls,
        ...controls,
      },
    })),

  setGameStatus: (status) => set({ gameStatus: status }),

  setWinner: (winner) =>
    set({
      winner,
      gameStatus: 'ended',
    }),

  clearAttackFlags: () =>
    set((state) => ({
      mechs: {
        player1: {
          ...state.mechs.player1,
          isAttacking: false,
        },
        player2: {
          ...state.mechs.player2,
          isAttacking: false,
        },
      },
    })),

  clearHitFlags: (currentTime) =>
    set((state) => ({
      mechs: {
        player1: {
          ...state.mechs.player1,
          isHit: currentTime > state.mechs.player1.hitFlashEnd,
        },
        player2: {
          ...state.mechs.player2,
          isHit: currentTime > state.mechs.player2.hitFlashEnd,
        },
      },
    })),
}));
