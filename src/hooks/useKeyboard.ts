import { useEffect } from 'react';
import { CONTROLS } from '../utils/constants';
import { useGameStore } from '../stores/gameStore';

export function useKeyboard() {
  const setPlayer1Controls = useGameStore((state) => state.setPlayer1Controls);
  const setPlayer2Controls = useGameStore((state) => state.setPlayer2Controls);
  const gameStatus = useGameStore((state) => state.gameStatus);

  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.code === CONTROLS.player1.left) {
        setPlayer1Controls({ left: true });
      }
      if (e.code === CONTROLS.player1.right) {
        setPlayer1Controls({ right: true });
      }
      if (e.code === CONTROLS.player1.up) {
        setPlayer1Controls({ up: true });
      }
      if (e.code === CONTROLS.player1.attack) {
        setPlayer1Controls({ attack: true });
      }
      if (e.code === CONTROLS.player1.defend) {
        setPlayer1Controls({ defend: true });
      }

      if (e.code === CONTROLS.player2.left) {
        setPlayer2Controls({ left: true });
      }
      if (e.code === CONTROLS.player2.right) {
        setPlayer2Controls({ right: true });
      }
      if (e.code === CONTROLS.player2.up) {
        setPlayer2Controls({ up: true });
      }
      if (e.code === CONTROLS.player2.attack) {
        setPlayer2Controls({ attack: true });
      }
      if (e.code === CONTROLS.player2.defend) {
        setPlayer2Controls({ defend: true });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.code === CONTROLS.player1.left) {
        setPlayer1Controls({ left: false });
      }
      if (e.code === CONTROLS.player1.right) {
        setPlayer1Controls({ right: false });
      }
      if (e.code === CONTROLS.player1.up) {
        setPlayer1Controls({ up: false });
      }
      if (e.code === CONTROLS.player1.attack) {
        setPlayer1Controls({ attack: false });
      }
      if (e.code === CONTROLS.player1.defend) {
        setPlayer1Controls({ defend: false });
      }

      if (e.code === CONTROLS.player2.left) {
        setPlayer2Controls({ left: false });
      }
      if (e.code === CONTROLS.player2.right) {
        setPlayer2Controls({ right: false });
      }
      if (e.code === CONTROLS.player2.up) {
        setPlayer2Controls({ up: false });
      }
      if (e.code === CONTROLS.player2.attack) {
        setPlayer2Controls({ attack: false });
      }
      if (e.code === CONTROLS.player2.defend) {
        setPlayer2Controls({ defend: false });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStatus, setPlayer1Controls, setPlayer2Controls]);
}
