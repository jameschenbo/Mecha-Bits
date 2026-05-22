import type { Mech } from '../../types/game';
import { GAME_CONFIG, COLORS } from '../../utils/constants';

interface MechProps {
  mech: Mech;
}

export function Mech({ mech }: MechProps) {
  const isPlayer1 = mech.id === 'player1';
  const primaryColor = isPlayer1 ? COLORS.PLAYER1_PRIMARY : COLORS.PLAYER2_PRIMARY;
  const secondaryColor = isPlayer1 ? COLORS.PLAYER1_SECONDARY : COLORS.PLAYER2_SECONDARY;

  const mechStyle: React.CSSProperties = {
    position: 'absolute',
    left: mech.x,
    top: mech.y,
    width: GAME_CONFIG.MECH_WIDTH,
    height: GAME_CONFIG.MECH_HEIGHT,
    transition: 'none',
    imageRendering: 'pixelated',
  };

  const getAnimationClass = () => {
    if (mech.isHit) return 'mech-hit';
    if (mech.isAttacking) return 'mech-attack';
    if (mech.isDefending) return 'mech-defend';
    if (Math.abs(mech.velocityX) > 0) return 'mech-move';
    return 'mech-idle';
  };

  return (
    <div style={mechStyle} className={getAnimationClass()}>
      <svg
        width={GAME_CONFIG.MECH_WIDTH}
        height={GAME_CONFIG.MECH_HEIGHT}
        viewBox={`0 0 ${GAME_CONFIG.MECH_WIDTH} ${GAME_CONFIG.MECH_HEIGHT}`}
        style={{
          imageRendering: 'pixelated',
          transform: mech.facingRight ? 'scaleX(1)' : 'scaleX(-1)',
        }}
      >
        {mech.isAttacking ? (
          <AttackFrame primaryColor={primaryColor} secondaryColor={secondaryColor} />
        ) : mech.isDefending ? (
          <DefendFrame primaryColor={primaryColor} secondaryColor={secondaryColor} />
        ) : (
          <IdleFrame primaryColor={primaryColor} secondaryColor={secondaryColor} />
        )}
      </svg>
      {mech.isHit && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            animation: 'flash 0.1s ease-out',
          }}
        />
      )}
    </div>
  );
}

interface FrameProps {
  primaryColor: string;
  secondaryColor: string;
}

function IdleFrame({ primaryColor, secondaryColor }: FrameProps) {
  return (
    <g>
      <rect x="18" y="4" width="12" height="12" fill={secondaryColor} />
      <rect x="20" y="6" width="8" height="8" fill="#111" />
      <rect x="14" y="16" width="20" height="16" fill={primaryColor} />
      <rect x="16" y="18" width="4" height="4" fill={secondaryColor} />
      <rect x="28" y="18" width="4" height="4" fill={secondaryColor} />
      <rect x="8" y="20" width="6" height="12" fill={primaryColor} />
      <rect x="34" y="20" width="6" height="12" fill={primaryColor} />
      <rect x="10" y="22" width="4" height="8" fill={secondaryColor} />
      <rect x="34" y="22" width="4" height="8" fill={secondaryColor} />
      <rect x="14" y="32" width="8" height="16" fill={primaryColor} />
      <rect x="26" y="32" width="8" height="16" fill={primaryColor} />
      <rect x="16" y="48" width="6" height="12" fill={secondaryColor} />
      <rect x="26" y="48" width="6" height="12" fill={secondaryColor} />
    </g>
  );
}

function AttackFrame({ primaryColor, secondaryColor }: FrameProps) {
  return (
    <g>
      <rect x="18" y="4" width="12" height="12" fill={secondaryColor} />
      <rect x="20" y="6" width="8" height="8" fill="#111" />
      <rect x="14" y="16" width="20" height="16" fill={primaryColor} />
      <rect x="16" y="18" width="4" height="4" fill={secondaryColor} />
      <rect x="28" y="18" width="4" height="4" fill={secondaryColor} />
      <rect x="8" y="20" width="6" height="12" fill={primaryColor} />
      <rect x="34" y="12" width="14" height="8" fill={secondaryColor} />
      <rect x="10" y="22" width="4" height="8" fill={secondaryColor} />
      <rect x="14" y="32" width="8" height="16" fill={primaryColor} />
      <rect x="26" y="32" width="8" height="16" fill={primaryColor} />
      <rect x="16" y="48" width="6" height="12" fill={secondaryColor} />
      <rect x="26" y="48" width="6" height="12" fill={secondaryColor} />
    </g>
  );
}

function DefendFrame({ primaryColor, secondaryColor }: FrameProps) {
  return (
    <g>
      <rect x="18" y="4" width="12" height="12" fill={secondaryColor} />
      <rect x="20" y="6" width="8" height="8" fill="#111" />
      <rect x="14" y="16" width="20" height="16" fill={primaryColor} />
      <rect x="16" y="18" width="4" height="4" fill={secondaryColor} />
      <rect x="28" y="18" width="4" height="4" fill={secondaryColor} />
      <rect x="4" y="20" width="10" height="20" fill={secondaryColor} />
      <rect x="34" y="20" width="10" height="20" fill={secondaryColor} />
      <rect x="6" y="22" width="6" height="16" fill="#fff" />
      <rect x="36" y="22" width="6" height="16" fill="#fff" />
      <rect x="14" y="32" width="8" height="16" fill={primaryColor} />
      <rect x="26" y="32" width="8" height="16" fill={primaryColor} />
      <rect x="16" y="48" width="6" height="12" fill={secondaryColor} />
      <rect x="26" y="48" width="6" height="12" fill={secondaryColor} />
    </g>
  );
}
