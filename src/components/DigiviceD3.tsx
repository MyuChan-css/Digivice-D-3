// ==================== DigiviceD3.tsx ====================
import { LCDScreen } from './LCDScreen';
import { EvolutionScreen } from './EvolutionScreen';
import { useEffect, useRef, useState } from 'react';
import { ActionButtons } from './ActionButtons';
import { useDigivicePower } from '../hooks/useDigivicePower';
import { useDigiviceActions } from '../hooks/useDigiviceActions';

import digimonSound from '../assets/sounds/Digimon.mp3';

export function DigiviceD3() {
  console.log('🔄 DigiviceD3 está renderizando...'); // DEBUG

  const { isPowered, togglePower } = useDigivicePower();
  const { selectedIndex, currentView, digimonList, selectedDigimon, evolutionState, triggerEvolution, handleButtonA, handleButtonB } = useDigiviceActions(isPowered);

  // 📱 RESPONSIVE SCALE
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const BASE_WIDTH = 450; // Original width including margin
      const BASE_HEIGHT = 650; // Original height including margin
      const padding = 20;

      const availableWidth = window.innerWidth - padding;
      const availableHeight = window.innerHeight - padding;

      const scaleX = availableWidth / BASE_WIDTH;
      const scaleY = availableHeight / BASE_HEIGHT;

      // Fit to screen, but max out at 1 (original size)
      const newScale = Math.min(scaleX, scaleY, 1.2);
      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Init
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🎵 CONFIGURACIÓN DE AUDIO
  // CAMBIA ESTE VALOR para modificar la duración de la canción (en milisegundos)
  // 15000 = 15 segundos
  // 90000 = 1 minuto y medio (canción completa aprox)
  const SONG_DURATION_MS = 45000;

  // 🎵 AUDIO REF
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (audioTimeoutRef.current) {
        clearTimeout(audioTimeoutRef.current);
      }
    };
  }, []);

  // Sync Audio with Power State (Safety check)
  useEffect(() => {
    if (!isPowered) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (audioTimeoutRef.current) {
        clearTimeout(audioTimeoutRef.current);
      }
    }
  }, [isPowered]);

  const handlePowerClick = () => {
    console.log('⚡ POWER CLICKED'); // DEBUG

    // Initialize audio if needed
    if (!audioRef.current) {
      console.log("🎵 Initializing Audio with:", digimonSound);
      audioRef.current = new Audio(digimonSound);
      audioRef.current.volume = 1.0;
    } else {
      // Reset audio if it already exists to ensure fresh start
      audioRef.current.currentTime = 0;
    }

    if (!isPowered) {
      // Turning ON
      console.log("🔊 Playing audio (User Gesture)");
      audioRef.current.play()
        .then(() => {
          // Programar el apagado automático del audio
          if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current);

          audioTimeoutRef.current = setTimeout(() => {
            console.log("⏳ Song duration reached. Stopping audio.");
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
          }, SONG_DURATION_MS);
        })
        .catch((e: unknown) => console.error("❌ Audio play error:", e));

    } else {
      // Turning OFF
      console.log("🔇 Stopping audio");
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      if (audioTimeoutRef.current) {
        clearTimeout(audioTimeoutRef.current);
      }
    }

    togglePower();
  };



  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-[#121212] overflow-hidden">
      {/* Device Frame */}
      <div
        className="relative flex flex-col items-center transition-transform duration-200 ease-out"
        style={{
          width: '400px',
          height: '600px',
          transform: `scale(${scale})`,
          borderRadius: '25px',
          background: 'linear-gradient(145deg, #4a4a4a, #2a2a2a)',
          border: '6px solid #555',
          boxShadow: isPowered ? '0 20px 40px rgba(0,0,0,0.7), inset 0 0 20px rgba(0, 255, 0, 0.2)' : '0 20px 40px rgba(0,0,0,0.7)',
          transition: 'box-shadow 0.3s ease'
        }}
      >
        {/* POWER BUTTON - Izquierdo (AZUL) */}
        <button
          onClick={handlePowerClick}
          className="absolute transition-all duration-200"
          style={{
            top: '20px',
            left: '30px',
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            border: '3px solid #1e40af',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <div className="text-sm font-bold text-[#1e3a8a]">⚡</div>
        </button>

        {/* LABEL */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 font-['Press_Start_2P'] text-[10px] text-[#888]">
          DIGITAL MONSTER
        </div>

        {/* SCREEN */}
        <div
          className="mt-24 w-[280px] h-[180px] rounded-[12px] bg-black border-5 border-[#3a3a3a] overflow-hidden relative transition-all duration-300"
          style={{
            boxShadow: evolutionState.isEvolving
              ? '0 0 50px rgba(255, 255, 255, 0.8), inset 0 0 30px rgba(255, 255, 255, 0.5)'
              : 'none'
          }}
        >
          {isPowered && (
            <>
              <div className="w-full h-full bg-[#001a00] p-3 relative">
                {/* RENDERIZADO CONDICIONAL DE VISTAS */}
                {!evolutionState.isEvolving && currentView === 'menu' && (
                  <LCDScreen
                    selectedIndex={selectedIndex}
                    currentView="menu"
                    digimonList={digimonList}
                  />
                )}

                {!evolutionState.isEvolving && currentView === 'detail' && (
                  <LCDScreen
                    selectedIndex={selectedIndex}
                    currentView="detail"
                    digimonList={digimonList}
                  />
                )}

                {!evolutionState.isEvolving && currentView === 'evolution' && (
                  <EvolutionScreen
                    selectedDigimon={selectedDigimon}
                    onEvolve={triggerEvolution}
                  />
                )}

                {/* EFECTO DE DIGIEVOLUCIÓN SUPERPUESTO */}
                {evolutionState.isEvolving && (
                  <>
                    {/* HOLY LIGHT FLASH - Increased z-index to ensure visibility */}
                    <div className="absolute inset-0 z-[100] bg-white animate-holy-flash pointer-events-none" />

                    <div className="absolute inset-0 flex items-center justify-center bg-[#e0ffe0] z-25 animate-pulse">
                      <div className="text-center">
                        <div className="text-[16px] font-bold text-[#004d00] animate-bounce tracking-widest">
                          DIGIVOLVING...
                        </div>
                        <div className="text-[10px] mt-2 font-bold text-[#004d00]">
                          {evolutionState.fromDigimon} &gt;&gt; {evolutionState.toDigimon}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* LCD Grid Effect */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: `repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)`
              }} />
            </>
          )}
        </div>

        {/* SPEAKER */}
        <div className="flex gap-1 mt-6 justify-center">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-[3px] h-[20px] bg-[#222] rounded-[2px]" />
          ))}
        </div>

        {/* ACTION BUTTONS - Derecha (AZULES) */}
        <ActionButtons
          isActive={isPowered}
          onButtonA={() => {
            console.log('🎮 BOTÓN A PRESIONADO'); // DEBUG
            handleButtonA();
          }}
          onButtonB={() => {
            console.log('🎮 BOTÓN B PRESIONADO'); // DEBUG
            handleButtonB();
          }}
        />
      </div>
    </div>
  );
}