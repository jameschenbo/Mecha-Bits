import React from 'react';
import { useGameStore } from '../../stores/gameStore';

interface VirtualControllerProps {
  playerId: 'player1' | 'player2';
  side: 'left' | 'right';
}

export function VirtualController({ playerId, side }: VirtualControllerProps) {
  const setControls = playerId === 'player1' 
    ? useGameStore((state) => state.setPlayer1Controls)
    : useGameStore((state) => state.setPlayer2Controls);

  const handleTouchStart = (action: keyof ReturnType<typeof useGameStore>['player1Controls']) => {
    setControls({ [action]: true });
  };

  const handleTouchEnd = (action: keyof ReturnType<typeof useGameStore>['player1Controls']) => {
    setControls({ [action]: false });
  };

  const buttonStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '3px solid rgba(255, 255, 255, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: 'white',
    userSelect: 'none' as const,
    touchAction: 'none' as const,
    WebkitUserSelect: 'none',
    WebkitTouchCallout: 'none',
  };

  const actionButtonStyle = {
    ...buttonStyle,
    width: '70px',
    height: '70px',
    backgroundColor: 'rgba(233, 69, 96, 0.3)',
    borderColor: '#e94560',
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        [side]: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        zIndex: 1000,
      }}
    >
      {side === 'left' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              style={buttonStyle}
              onTouchStart={(e) => { e.preventDefault(); handleTouchStart('up'); }}
              onTouchEnd={(e) => { e.preventDefault(); handleTouchEnd('up'); }}
              onMouseDown={() => handleTouchStart('up')}
              onMouseUp={() => handleTouchEnd('up')}
              onMouseLeave={() => handleTouchEnd('up')}
            >
              ↑
            </button>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              style={buttonStyle}
              onTouchStart={(e) => { e.preventDefault(); handleTouchStart('left'); }}
              onTouchEnd={(e) => { e.preventDefault(); handleTouchEnd('left'); }}
              onMouseDown={() => handleTouchStart('left')}
              onMouseUp={() => handleTouchEnd('left')}
              onMouseLeave={() => handleTouchEnd('left')}
            >
              ←
            </button>
            <button
              style={buttonStyle}
              onTouchStart={(e) => { e.preventDefault(); handleTouchStart('right'); }}
              onTouchEnd={(e) => { e.preventDefault(); handleTouchEnd('right'); }}
              onMouseDown={() => handleTouchStart('right')}
              onMouseUp={() => handleTouchEnd('right')}
              onMouseLeave={() => handleTouchEnd('right')}
            >
              →
            </button>
          </div>
        </>
      )}

      {side === 'right' && (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            style={{ ...actionButtonStyle, backgroundColor: 'rgba(0, 217, 255, 0.3)', borderColor: '#00d9ff' }}
            onTouchStart={(e) => { e.preventDefault(); handleTouchStart('defend'); }}
            onTouchEnd={(e) => { e.preventDefault(); handleTouchEnd('defend'); }}
            onMouseDown={() => handleTouchStart('defend')}
            onMouseUp={() => handleTouchEnd('defend')}
            onMouseLeave={() => handleTouchEnd('defend')}
          >
            🛡️
          </button>
          <button
            style={actionButtonStyle}
            onTouchStart={(e) => { e.preventDefault(); handleTouchStart('attack'); }}
            onTouchEnd={(e) => { e.preventDefault(); handleTouchEnd('attack'); }}
            onMouseDown={() => handleTouchStart('attack')}
            onMouseUp={() => handleTouchEnd('attack')}
            onMouseLeave={() => handleTouchEnd('attack')}
          >
            ⚔️
          </button>
        </div>
      )}
    </div>
  );
}
