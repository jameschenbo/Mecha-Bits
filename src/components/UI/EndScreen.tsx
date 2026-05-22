import { useGameStore } from '../../stores/gameStore';
import { COLORS } from '../../utils/constants';
import type { PlayerId } from '../../types/game';

export function EndScreen() {
  const { winner, resetGame, startGame } = useGameStore();

  const winnerName = winner === 'player1' ? '铁拳' : '铁壁';
  const winnerColor = winner === 'player1' ? COLORS.PLAYER1_PRIMARY : COLORS.PLAYER2_PRIMARY;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        gap: '40px',
        padding: '40px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '48px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            color: winnerColor,
            textShadow: '4px 4px 0 #000, 0 0 30px rgba(233, 69, 96, 0.5)',
            margin: 0,
            animation: 'pulse 1s ease-in-out infinite',
          }}
        >
          {winnerName}
        </h1>
        <h2
          style={{
            fontSize: '64px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            color: COLORS.ACCENT,
            textShadow: '3px 3px 0 #000',
            margin: '20px 0',
            letterSpacing: '8px',
          }}
        >
          VICTORY!
        </h2>
      </div>

      <div
        className="pixel-border"
        style={{
          padding: '30px 50px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: COLORS.TEXT,
            fontSize: '20px',
            fontFamily: 'monospace',
            margin: 0,
            lineHeight: '1.6',
          }}
        >
          恭喜{' '}
          <span style={{ color: winnerColor, fontWeight: 'bold' }}>{winnerName}</span>{' '}
          获得胜利！
        </p>
        <p
          style={{
            color: '#888',
            fontSize: '14px',
            fontFamily: 'monospace',
            marginTop: '10px',
          }}
        >
          战场已清理，机甲准备就绪
        </p>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <button
          onClick={startGame}
          style={{
            padding: '16px 32px',
            fontSize: '20px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            color: '#000',
            backgroundColor: winnerColor,
            border: '4px solid #000',
            cursor: 'pointer',
            boxShadow: '4px 4px 0 #000',
            transition: 'all 0.1s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '6px 6px 0 #000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = '4px 4px 0 #000';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translate(2px, 2px)';
            e.currentTarget.style.boxShadow = '2px 2px 0 #000';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '6px 6px 0 #000';
          }}
        >
          再来一局
        </button>

        <button
          onClick={resetGame}
          style={{
            padding: '16px 32px',
            fontSize: '20px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: '#666',
            border: '4px solid #000',
            cursor: 'pointer',
            boxShadow: '4px 4px 0 #000',
            transition: 'all 0.1s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '6px 6px 0 #000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = '4px 4px 0 #000';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translate(2px, 2px)';
            e.currentTarget.style.boxShadow = '2px 2px 0 #000';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '6px 6px 0 #000';
          }}
        >
          返回主菜单
        </button>
      </div>
    </div>
  );
}
