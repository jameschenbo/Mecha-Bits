import { useGameStore } from '../../stores/gameStore';
import { COLORS } from '../../utils/constants';

export function StartScreen() {
  const startGame = useGameStore((state) => state.startGame);

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
            fontSize: '64px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            color: COLORS.ACCENT,
            textShadow: '4px 4px 0 #000, 0 0 20px rgba(244, 114, 182, 0.5)',
            margin: 0,
            letterSpacing: '4px',
          }}
        >
          PIXEL MECH
        </h1>
        <h2
          style={{
            fontSize: '48px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            color: COLORS.TEXT,
            textShadow: '3px 3px 0 #000',
            margin: '10px 0 0 0',
            letterSpacing: '8px',
          }}
        >
          BATTLE
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
            fontSize: '18px',
            fontFamily: 'monospace',
            marginBottom: '20px',
            lineHeight: '1.6',
          }}
        >
          复古像素风机甲对战游戏
          <br />
          <span style={{ color: COLORS.ACCENT }}>本地双人对战</span>
        </p>

        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginBottom: '30px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: COLORS.PLAYER1_PRIMARY,
                marginBottom: '8px',
              }}
            >
              铁拳
            </div>
            <div
              style={{
                fontSize: '14px',
                color: COLORS.TEXT,
                fontFamily: 'monospace',
              }}
            >
              攻击型
            </div>
          </div>
          <div
            style={{
              fontSize: '32px',
              color: COLORS.ACCENT,
              fontWeight: 'bold',
            }}
          >
            VS
          </div>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: COLORS.PLAYER2_PRIMARY,
                marginBottom: '8px',
              }}
            >
              铁壁
            </div>
            <div
              style={{
                fontSize: '14px',
                color: COLORS.TEXT,
                fontFamily: 'monospace',
              }}
            >
              防御型
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={startGame}
        style={{
          padding: '16px 48px',
          fontSize: '24px',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          color: '#000',
          backgroundColor: COLORS.ACCENT,
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
        开始游戏
      </button>

      <div
        style={{
          color: '#888',
          fontSize: '14px',
          fontFamily: 'monospace',
          textAlign: 'center',
        }}
      >
        <div>玩家1: WASD移动 | F攻击 | G防御</div>
        <div style={{ marginTop: '4px' }}>玩家2: 方向键移动 | J攻击 | K防御</div>
      </div>
    </div>
  );
}
