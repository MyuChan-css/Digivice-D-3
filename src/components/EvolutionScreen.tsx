import { useState, useEffect } from 'react';
import { getEvolutionLine } from '../data/digimons';

interface EvolutionScreenProps {
  selectedDigimon: string;
  onEvolve: (from: string, to: string) => void;
}

export function EvolutionScreen({ selectedDigimon, onEvolve }: EvolutionScreenProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  const evolutionLine = getEvolutionLine(selectedDigimon);
  const currentIndex = evolutionLine.findIndex(d => d.name === selectedDigimon);
  const possibleEvolutions = evolutionLine[currentIndex]?.evolutions || [];

  return (
    <div className="relative w-full h-full p-2" style={{ fontFamily: 'Courier New, monospace' }}>
      {/* LCD Style Content */}
      <div className="relative z-10 flex flex-col h-full" style={{ color: '#2a3a2a' }}>
        {/* Header */}
        <div
          className="flex justify-between items-center px-2 py-1 mb-2"
          style={{
            fontSize: '8px',
            borderBottom: '2px solid rgba(42, 58, 42, 0.3)',
            letterSpacing: '1px'
          }}
        >
          <span>EVOLVE</span>
          <span>{time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {/* Main Display */}
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-2">
          <div
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              textAlign: 'center',
              lineHeight: '1'
            }}
          >
            ⚡
          </div>

          <div
            style={{
              fontSize: '9px',
              textAlign: 'center',
              letterSpacing: '1px'
            }}
          >
            SELECT
          </div>

          {/* Evolution List */}
          <div className="flex flex-col gap-1 w-full" style={{ fontSize: '9px', maxHeight: '60px', overflowY: 'auto' }}>
            {possibleEvolutions.length > 0 ? (
              possibleEvolutions.map((evo) => (
                <button
                  key={evo}
                  onClick={() => onEvolve(selectedDigimon, evo)}
                  className="flex items-center gap-1 w-full text-left hover:bg-[rgba(42,58,42,0.1)]"
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}
                >
                  <span>►</span>
                  <span>{evo}</span>
                </button>
              ))
            ) : (
              <div className="text-center text-[7px]">No evolutions</div>
            )}
          </div>
        </div>

        {/* Bottom Status */}
        <div
          className="flex justify-between items-center px-2 py-1"
          style={{
            fontSize: '7px',
            borderTop: '2px solid rgba(42, 58, 42, 0.3)',
            letterSpacing: '0.5px'
          }}
        >
          <span>BACK: B</span>
          <span>{possibleEvolutions.length} OPT</span>
        </div>
      </div>

      {/* LCD Segments Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(42, 58, 42, 0.1) 0px,
              transparent 1px,
              transparent 2px
            )
          `
        }}
      />

      {/* LCD Shadow/Depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
          borderRadius: '4px'
        }}
      />
    </div>
  );
}

export default EvolutionScreen;