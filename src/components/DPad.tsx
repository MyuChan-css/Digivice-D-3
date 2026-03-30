interface DPadProps {
  onDirection: (direction: 'up' | 'down' | 'left' | 'right') => void;
  powerState: 'on' | 'off';
}

export function DPad({ onDirection, powerState }: DPadProps) {
  const buttonStyle = {
    backgroundColor: '#444',
    border: '2px solid #333',
    boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)',
    cursor: powerState === 'on' ? 'pointer' : 'default',
    transition: 'all 0.1s ease',
    opacity: powerState === 'on' ? 1 : 0.5
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (powerState === 'on') {
      e.currentTarget.style.backgroundColor = '#666';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#444';
  };

  return (
    <div className="relative" style={{ width: '120px', height: '120px' }}>
      {/* Grid Layout */}
      <div className="grid grid-cols-3 grid-rows-3 w-full h-full gap-0">
        {/* Row 1 */}
        <div />
        <button
          onClick={() => onDirection('up')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={powerState === 'off'}
          style={{
            ...buttonStyle,
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px'
          }}
        >
          <div className="flex items-center justify-center h-full" style={{ fontSize: '16px', color: '#222' }}>▲</div>
        </button>
        <div />

        {/* Row 2 */}
        <button
          onClick={() => onDirection('left')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={powerState === 'off'}
          style={{
            ...buttonStyle,
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px'
          }}
        >
          <div className="flex items-center justify-center h-full" style={{ fontSize: '16px', color: '#222' }}>◄</div>
        </button>
        <div 
          style={{
            backgroundColor: '#2a2a2a',
            border: '2px solid #333',
            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.8)'
          }}
        />
        <button
          onClick={() => onDirection('right')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={powerState === 'off'}
          style={{
            ...buttonStyle,
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px'
          }}
        >
          <div className="flex items-center justify-center h-full" style={{ fontSize: '16px', color: '#222' }}>►</div>
        </button>

        {/* Row 3 */}
        <div />
        <button
          onClick={() => onDirection('down')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={powerState === 'off'}
          style={{
            ...buttonStyle,
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px'
          }}
        >
          <div className="flex items-center justify-center h-full" style={{ fontSize: '16px', color: '#222' }}>▼</div>
        </button>
        <div />
      </div>
    </div>
  );
}
