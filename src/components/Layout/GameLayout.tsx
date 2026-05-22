import { useGameStore } from '../../stores/gameStore';
import { StartScreen } from '../UI/StartScreen';
import { EndScreen } from '../UI/EndScreen';
import { GameCanvas } from '../Game/GameCanvas';
import { COLORS } from '../../utils/constants';

export function GameLayout() {
  const gameStatus = useGameStore((state) => state.gameStatus);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: COLORS.BACKGROUND,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
      }}
    >
      {gameStatus === 'start' && <StartScreen />}
      {gameStatus === 'playing' && <GameCanvas />}
      {gameStatus === 'ended' && <EndScreen />}
    </div>
  );
}
