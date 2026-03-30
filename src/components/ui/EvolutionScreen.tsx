// 🔥 IMPORTS EN LA LÍNEA SUPERIOR
import { getEvolutionLine } from '../../data/digimons';

interface EvolutionScreenProps {
  selectedDigimon: string;
  onEvolve: (from: string, to: string) => void;
}

// 🎯 PANTALLA DE SELECCIÓN DE EVOLUCIÓN
export function EvolutionScreen({ selectedDigimon, onEvolve }: EvolutionScreenProps) {
  const evolutionLine = getEvolutionLine(selectedDigimon);
  const currentIndex = evolutionLine.findIndex(d => d.name === selectedDigimon);
  
  // Solo mostrar evoluciones posibles desde el actual
  const possibleEvolutions = evolutionLine[currentIndex]?.evolutions || [];

  return (
    <div className="relative w-full h-full p-2 font-['Press_Start_2P'] text-[8px] text-[#2a3a2a]">
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center px-2 py-1 mb-2 text-[8px] border-b border-[rgba(42,58,42,0.3)]">
          <span>EVOLVE</span>
          <span>{selectedDigimon}</span>
        </div>

        {/* Main Display */}
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-2">
          <div className="text-[24px] font-bold">⚡</div>
          <div className="text-[9px] text-center">SELECT EVOLUTION</div>
          
          {/* Lista de evoluciones */}
          <div className="flex flex-col gap-2 w-full text-[8px] max-h-[60px] overflow-y-auto">
            {possibleEvolutions.length > 0 ? (
              possibleEvolutions.map((evo, i) => (
                <button
                  key={evo}
                  onClick={() => onEvolve(selectedDigimon, evo)}
                  className="flex items-center gap-1 p-1 hover:bg-[rgba(42,58,42,0.1)] rounded cursor-pointer transition-colors"
                >
                  <span>▶</span>
                  <span>{evo}</span>
                </button>
              ))
            ) : (
              <div className="text-center text-[7px]">No evolutions available</div>
            )}
          </div>

          {/* Línea evolutiva completa */}
          <div className="text-[7px] mt-2 w-full text-center">
            <div className="mb-1">Line:</div>
            <div className="flex justify-center gap-1 flex-wrap">
              {evolutionLine.map((d, i) => (
                <span key={d.name} className={i === currentIndex ? 'text-[#ff8c00]' : ''}>
                  {d.name}{i < evolutionLine.length - 1 ? '→' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="flex justify-between items-center px-2 py-1 text-[7px] border-t border-[rgba(42,58,42,0.3)]">
          <span>Lv:{evolutionLine[currentIndex]?.stage || 'Unknown'}</span>
          <span>Press B to back</span>
        </div>

        {/* LCD Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(42,58,42,0.1) 0px, rgba(42,58,42,0.1) 2px, transparent 2px, transparent 4px)`
        }}/>
      </div>
    </div>
  );
}