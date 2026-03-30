interface DigitalSymbolsProps {
  active: boolean;
}

export function DigitalSymbols({ active }: DigitalSymbolsProps) {
  // Digital symbols that appear around the circle
  const symbols = [
    { angle: -90, text: '✱', type: 'symbol' },
    { angle: -70, text: '开', type: 'kanji' },
    { angle: -50, text: '◇', type: 'symbol' },
    { angle: -30, text: '十', type: 'kanji' },
    { angle: -10, text: 'Ω', type: 'symbol' },
    { angle: 10, text: 'ᗕ', type: 'symbol' },
    { angle: 30, text: '≡', type: 'symbol' },
    { angle: 50, text: 'Ӂ', type: 'symbol' },
    { angle: 70, text: '→', type: 'arrow' },
    { angle: 90, text: '≋', type: 'symbol' },
    { angle: 110, text: '⚡', type: 'symbol' },
    { angle: 130, text: '◆', type: 'symbol' },
    { angle: 150, text: 'ᗒ', type: 'symbol' },
    { angle: 170, text: '∥', type: 'symbol' },
    { angle: 190, text: '⚊', type: 'symbol' },
    { angle: 210, text: '✱', type: 'symbol' },
    { angle: 230, text: '◈', type: 'symbol' },
    { angle: 250, text: '←', type: 'arrow' },
    { angle: 270, text: '⋈', type: 'symbol' }
  ];

  return (
    <g>
      {/* Ring border lines */}
      <circle 
        cx="160" 
        cy="160" 
        r="138" 
        fill="none" 
        stroke="#8b6820" 
        strokeWidth="1.5"
      />
      <circle 
        cx="160" 
        cy="160" 
        r="145" 
        fill="none" 
        stroke="#a86820" 
        strokeWidth="1"
        opacity="0.7"
      />

      {/* Digital symbols around the ring */}
      {symbols.map((item, index) => {
        const radius = 140;
        const angleRad = (item.angle * Math.PI) / 180;
        const x = 160 + radius * Math.cos(angleRad);
        const y = 160 + radius * Math.sin(angleRad);
        
        return (
          <text
            key={index}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontSize: item.type === 'kanji' ? '16px' : '14px',
              fontFamily: item.type === 'kanji' ? 'serif' : 'Arial, sans-serif',
              fontWeight: 'bold',
              fill: active ? '#ff8c00' : '#8b6820',
              filter: active ? 'drop-shadow(0 0 3px rgba(255, 140, 0, 0.8))' : 'none',
              transition: 'all 0.3s ease'
            }}
            transform={`rotate(${item.angle + 90}, ${x}, ${y})`}
          >
            {item.text}
          </text>
        );
      })}

      {/* Decorative dots on the ring */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const radius = 148;
        const rad = ((angle - 90) * Math.PI) / 180;
        const x = 160 + radius * Math.cos(rad);
        const y = 160 + radius * Math.sin(rad);
        
        return (
          <circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r="2.5"
            fill={active && i % 2 === 0 ? '#ff8c00' : '#8b6820'}
            style={{
              filter: active && i % 2 === 0 ? 'drop-shadow(0 0 4px rgba(255, 140, 0, 0.9))' : 'none',
              transition: 'all 0.3s ease'
            }}
          />
        );
      })}

      {/* Animated pulse ring when active */}
      {active && (
        <>
          <circle 
            cx="160" 
            cy="160" 
            r="140" 
            fill="none" 
            stroke="rgba(255, 140, 0, 0.3)" 
            strokeWidth="2"
            style={{ animation: 'pulse 2s ease-in-out infinite' }}
          />
          <style>
            {`
              @keyframes pulse {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 0.8; }
              }
            `}
          </style>
        </>
      )}
    </g>
  );
}
