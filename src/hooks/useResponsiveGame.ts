import { useEffect, useState } from 'react';
import { updateGameScale, BASE_GAME_CONFIG } from '../utils/constants';
import { useGameStore } from '../stores/gameStore';

export function useResponsiveGame() {
  const [scale, setScale] = useState(1);
  const resetGame = useGameStore((state) => state.resetGame);

  useEffect(() => {
    const calculateScale = () => {
      const maxWidth = window.innerWidth - 40;
      const maxHeight = window.innerHeight - 300;
      
      const widthScale = maxWidth / BASE_GAME_CONFIG.FIELD_WIDTH;
      const heightScale = maxHeight / BASE_GAME_CONFIG.FIELD_HEIGHT;
      
      const newScale = Math.min(widthScale, heightScale, 1.5);
      
      if (Math.abs(newScale - scale) > 0.01) {
        setScale(newScale);
        updateGameScale(newScale);
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);

    return () => {
      window.removeEventListener('resize', calculateScale);
    };
  }, [scale, resetGame]);

  return scale;
}
