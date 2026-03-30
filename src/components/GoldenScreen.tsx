import { useState, useEffect } from 'react';

interface GoldenScreenProps {
  selectedIndex: number;
  digimonList: string[];
  mode: 'menu' | 'detail';
}

export function GoldenScreen({ selectedIndex, digimonList, mode }: GoldenScreenProps) {
  const [time, setTime] = useState(new Date());
  const [blinkCursor, setBlinkCursor] = useState(true);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkCursor(prev => !prev);
    }, 500);

    return () => clearInterval(blinkInterval);
  }, []);

  const safeIndex = selectedIndex >= 0 && selectedIndex < digimonList.length ? selectedIndex : 0;
  const selectedDigimon = digimonList[safeIndex];

  // Calculate visible window for menu
  const WINDOW_SIZE = 3;
  let startIdx = Math.max(0, safeIndex - 1);
  if (startIdx + WINDOW_SIZE > digimonList.length) {
    startIdx = Math.max(0, digimonList.length - WINDOW_SIZE);
  }
  const visibleItems = digimonList.slice(startIdx, startIdx + WINDOW_SIZE);

  return (
    <div className="relative w-full h-full p-2" style={{ fontFamily: 'Courier New, monospace' }}>
      {/* LCD Style Content */}
      <div className="relative z-10 flex flex-col h-full" style={{ color: '#2a3a2a' }}>
        {/* Header with pixel border */}
        <div 
          className="flex justify-between items-center px-2 py-1 mb-2"
          style={{
            fontSize: '8px',
            borderBottom: '2px solid rgba(42, 58, 42, 0.3)',
            letterSpacing: '1px'
          }}
        >
          <span>{mode === 'menu' ? 'DIGI' : 'INFO'}</span>
          <span>{time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {/* Main Display Area */}
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-2">
          {/* Large Digital Icon/Symbol */}
          <div 
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              textAlign: 'center',
              lineHeight: '1'
            }}
          >
            ◆
          </div>

          {/* Status Text */}
          <div 
            style={{
              fontSize: '10px',
              textAlign: 'center',
              letterSpacing: '1px'
            }}
          >
            {mode === 'menu' ? 'READY' : 'ANALYZING'}
          </div>

          {/* Menu Options */}
          <div className="flex flex-col gap-1 w-full" style={{ fontSize: '9px' }}>
            {mode === 'menu' ? (
              visibleItems.map((digimon, i) => {
                const actualIndex = startIdx + i;
                const isSelected = actualIndex === safeIndex;
                return (
                  <div key={digimon} className="flex items-center gap-1">
                    {isSelected ? (
                      <>
                        {blinkCursor ? <span>►</span> : <span style={{ opacity: 0 }}>►</span>}
                      </>
                    ) : (
                      <span style={{ opacity: 0 }}>►</span>
                    )}
                    <span className={isSelected ? "" : "pl-3"}>{digimon}</span>
                  </div>
                );
              })
            ) : (
              // Detail Mode
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <span>►</span>
                  <span>{selectedDigimon}</span>
                </div>
                <div className="pl-3">Stage: Rookie</div>
                <div className="pl-3">Type: Vaccine</div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div 
          className="flex justify-between items-center px-2 py-1"
          style={{
            fontSize: '7px',
            borderTop: '2px solid rgba(42, 58, 42, 0.3)',
            letterSpacing: '0.5px'
          }}
        >
          <span>LV.99</span>
          <span>HP: ████</span>
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

export default GoldenScreen;