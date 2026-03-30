import { useState, useMemo, useRef, useEffect } from 'react';
import { DigitalSymbols } from './DigitalSymbols';
import { GoldenScreen } from './GoldenScreen';
import { EvolutionScreen } from './EvolutionScreen';
import { useDigivicePower } from '../hooks/useDigivicePower';
import { useDigiviceActions } from '../hooks/useDigiviceActions';
import digimonSound from '../assets/sounds/Digimon.mp3';
import digievolucionSound from '../assets/sounds/Digievolucion.mp3';

export function DigiviceGolden() {
  // Hooks
  const { isPowered, togglePower } = useDigivicePower();
  const { selectedIndex, currentView, digimonList, selectedDigimon, evolutionState, triggerEvolution, finishEvolution, handleButtonA, handleButtonB } = useDigiviceActions(isPowered);

  // 🎵 CONFIGURACIÓN DE AUDIO
  const SONG_DURATION_MS = 20000;
  // Duración aproximada de la canción de evolución (ajustar según el archivo real)


  // 🎵 AUDIO REF
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const evolutionAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (evolutionAudioRef.current) {
        evolutionAudioRef.current.pause();
        evolutionAudioRef.current.currentTime = 0;
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
      if (evolutionAudioRef.current) {
        evolutionAudioRef.current.pause();
        evolutionAudioRef.current.currentTime = 0;
      }
      if (audioTimeoutRef.current) {
        clearTimeout(audioTimeoutRef.current);
      }
    }
  }, [isPowered]);

  // Handle Evolution Audio
  const handleEvolutionTrigger = (from: string, to: string) => {
    // Stop background music if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Play evolution sound
    if (!evolutionAudioRef.current) {
      evolutionAudioRef.current = new Audio(digievolucionSound);
      evolutionAudioRef.current.volume = 0.8;
    } else {
      evolutionAudioRef.current.currentTime = 0;
    }

    // Set up event listener for when the song ends
    evolutionAudioRef.current.onended = () => {
      console.log("🎵 Evolution song ended. Finishing evolution.");
      finishEvolution(to);
    };

    evolutionAudioRef.current.play().catch(e => console.error("Error playing evolution sound:", e));

    // Trigger visual evolution WITHOUT auto-finish (wait for audio)
    triggerEvolution(from, to, 0, false);
  };

  // Local state for button visual feedback
  const [activeButton, setActiveButton] = useState<string | null>(null);

  // Safe index calculation
  const detailIndex = useMemo(() => {
    const index = digimonList.indexOf(selectedDigimon);
    return index >= 0 ? index : 0;
  }, [selectedDigimon, digimonList]);

  // Unified button handler
  const handleButtonClick = (button: string) => {
    setActiveButton(button);
    setTimeout(() => setActiveButton(null), 200);

    if (button === 'left') {
      console.log('⚡ POWER CLICKED');

      // Initialize audio if needed
      if (!audioRef.current) {
        console.log("🎵 Initializing Audio with:", digimonSound);
        audioRef.current = new Audio(digimonSound);
        audioRef.current.volume = 0.5;
      } else {
        audioRef.current.currentTime = 0;
      }

      if (!isPowered) {
        // Turning ON
        console.log("🔊 Playing audio (User Gesture)");
        audioRef.current.play()
          .then(() => {
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
        if (evolutionAudioRef.current) {
          evolutionAudioRef.current.pause();
          evolutionAudioRef.current.currentTime = 0;
        }
        if (audioTimeoutRef.current) {
          clearTimeout(audioTimeoutRef.current);
        }
      }

      togglePower();
    }
    if (button === 'top-right') {
      console.log('⬇️ BOTÓN A PRESIONADO');
      handleButtonA();
    }
    if (button === 'bottom-right') {
      console.log('✅ BOTÓN B PRESIONADO');
      handleButtonB();
    }
  };

  // 📱 RESPONSIVE SCALE
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const BASE_WIDTH = 600; // Original width including margin
      const BASE_HEIGHT = 800; // Original height including margin
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

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Main Device Body - Organic Shape with SVG */}
      <div
        className="relative transition-transform duration-200 ease-out"
        style={{
          width: '550px',
          height: '550px',
          transform: `scale(${scale})`
        }}
      >
        <svg
          viewBox="0 0 550 550"
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))' }}
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#e6a93d', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#d89a2d', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#c98a1d', stopOpacity: 1 }} />
            </linearGradient>

            <linearGradient id="goldHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f4d87f', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
            </linearGradient>

            <filter id="innerShadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="0" dy="2" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <radialGradient id="blueGradient">
              <stop offset="0%" style={{ stopColor: '#3b82f6' }} />
              <stop offset="100%" style={{ stopColor: '#2563eb' }} />
            </radialGradient>
            <radialGradient id="blueGradient2">
              <stop offset="0%" style={{ stopColor: '#3b82f6' }} />
              <stop offset="100%" style={{ stopColor: '#2563eb' }} />
            </radialGradient>
            <radialGradient id="blueGradient3">
              <stop offset="0%" style={{ stopColor: '#3b82f6' }} />
              <stop offset="100%" style={{ stopColor: '#2563eb' }} />
            </radialGradient>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#e6a93d' }} />
              <stop offset="50%" style={{ stopColor: '#d89a2d' }} />
              <stop offset="100%" style={{ stopColor: '#c98a1d' }} />
            </linearGradient>
          </defs>

          {/* Main Body Shape - Organic with notches */}
          <path
            d="M 150,80 
               L 200,80 L 200,60 L 230,60 L 230,80 
               L 320,80 L 320,60 L 350,60 L 350,80 
               L 400,80
               C 420,80 440,90 450,110
               L 490,250
               C 495,270 495,280 490,300
               L 450,440
               C 440,460 420,470 400,470
               L 350,470 L 350,490 L 320,490 L 320,470
               L 230,470 L 230,490 L 200,490 L 200,470
               L 150,470
               C 130,470 110,460 100,440
               L 60,300
               C 55,280 55,270 60,250
               L 100,110
               C 110,90 130,80 150,80 Z"
            fill="url(#goldGradient)"
            stroke="#8b6820"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Inner border */}
          <path
            d="M 150,95 
               L 195,95 L 195,75 L 235,75 L 235,95 
               L 315,95 L 315,75 L 355,75 L 355,95 
               L 400,95
               C 415,95 430,103 437,118
               L 475,250
               C 479,267 479,283 475,300
               L 437,432
               C 430,447 415,455 400,455
               L 355,455 L 355,475 L 315,475 L 315,455
               L 235,455 L 235,475 L 195,475 L 195,455
               L 150,455
               C 135,455 120,447 113,432
               L 75,300
               C 71,283 71,267 75,250
               L 113,118
               C 120,103 135,95 150,95 Z"
            fill="none"
            stroke="#b87a1d"
            strokeWidth="2"
          />

          {/* Highlight gradient overlay */}
          <path
            d="M 150,80 
               L 200,80 L 200,60 L 230,60 L 230,80 
               L 320,80 L 320,60 L 350,60 L 350,80 
               L 400,80
               C 420,80 440,90 450,110
               L 490,250
               C 495,270 495,280 490,300
               L 450,440
               C 440,460 420,470 400,470
               L 350,470 L 350,490 L 320,490 L 320,470
               L 230,470 L 230,490 L 200,490 L 200,470
               L 150,470
               C 130,470 110,460 100,440
               L 60,300
               C 55,280 55,270 60,250
               L 100,110
               C 110,90 130,80 150,80 Z"
            fill="url(#goldHighlight)"
            opacity="0.5"
          />

          {/* Top protrusions */}
          <rect x="213" y="45" width="14" height="18" rx="3" fill="#d89a2d" stroke="#8b6820" strokeWidth="3" />
          <circle cx="220" cy="50" r="5" fill="#e6a93d" stroke="#8b6820" strokeWidth="2" />

          <rect x="333" y="45" width="14" height="18" rx="3" fill="#d89a2d" stroke="#8b6820" strokeWidth="3" />
          <circle cx="340" cy="50" r="5" fill="#e6a93d" stroke="#8b6820" strokeWidth="2" />
        </svg>

        {/* Antenna - Top Left */}
        <div
          className="absolute"
          style={{
            top: '45px',
            left: '85px',
            width: '35px',
            height: '90px',
            zIndex: 20
          }}
        >
          {/* Antenna body */}
          <svg width="35" height="90" viewBox="0 0 35 90">
            <path
              d="M 10,90 L 5,30 L 8,10 L 15,0 L 22,10 L 25,30 L 20,90 Z"
              fill="#1a1a1a"
              stroke="#000"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Ridges */}
            <line x1="7" y1="35" x2="23" y2="35" stroke="#2a2a2a" strokeWidth="2" />
            <line x1="6" y1="50" x2="24" y2="50" stroke="#2a2a2a" strokeWidth="2" />
            <line x1="8" y1="65" x2="22" y2="65" stroke="#2a2a2a" strokeWidth="2" />
          </svg>
        </div>

        {/* Left Button - with concentric rings */}
        <button
          onClick={() => handleButtonClick('left')}
          className="absolute transition-all duration-150"
          style={{
            top: '50%',
            left: '40px',
            transform: 'translateY(-50%)',
            width: '80px',
            height: '80px',
            zIndex: 10
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80">
            {/* Outer ring */}
            <circle
              cx="40"
              cy="40"
              r="38"
              fill="url(#blueGradient)"
              stroke="#1e3a8a"
              strokeWidth="3"
            />
            {/* Middle ring */}
            <circle
              cx="40"
              cy="40"
              r="28"
              fill="none"
              stroke="#1e40af"
              strokeWidth="2"
            />
            {/* Inner circle */}
            <circle
              cx="40"
              cy="40"
              r="18"
              fill={activeButton === 'left' ? '#1e40af' : '#2563eb'}
              stroke="#1e3a8a"
              strokeWidth="2"
            />
            {/* Highlight */}
            <ellipse
              cx="35"
              cy="32"
              rx="12"
              ry="8"
              fill="rgba(255,255,255,0.3)"
            />
          </svg>
        </button>

        {/* Right Top Button */}
        <button
          onClick={() => handleButtonClick('top-right')}
          className="absolute transition-all duration-150"
          style={{
            top: '38%',
            right: '35px',
            transform: 'translateY(-50%)',
            width: '70px',
            height: '70px',
            zIndex: 10
          }}
        >
          <svg width="70" height="70" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r="33" fill="url(#blueGradient2)" stroke="#1e3a8a" strokeWidth="3" />
            <circle cx="35" cy="35" r="24" fill="none" stroke="#1e40af" strokeWidth="2" />
            <circle cx="35" cy="35" r="15" fill={activeButton === 'top-right' ? '#1e40af' : '#2563eb'} stroke="#1e3a8a" strokeWidth="2" />
            <ellipse cx="30" cy="28" rx="10" ry="7" fill="rgba(255,255,255,0.3)" />
          </svg>
        </button>

        {/* Right Bottom Button */}
        <button
          onClick={() => handleButtonClick('bottom-right')}
          className="absolute transition-all duration-150"
          style={{
            top: '62%',
            right: '35px',
            transform: 'translateY(-50%)',
            width: '70px',
            height: '70px',
            zIndex: 10
          }}
        >
          <svg width="70" height="70" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r="33" fill="url(#blueGradient3)" stroke="#1e3a8a" strokeWidth="3" />
            <circle cx="35" cy="35" r="24" fill="none" stroke="#1e40af" strokeWidth="2" />
            <circle cx="35" cy="35" r="15" fill={activeButton === 'bottom-right' ? '#1e40af' : '#2563eb'} stroke="#1e3a8a" strokeWidth="2" />
            <ellipse cx="30" cy="28" rx="10" ry="7" fill="rgba(255,255,255,0.3)" />
          </svg>
        </button>

        {/* Screen Assembly - Center */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ width: '320px', height: '320px', zIndex: 5 }}
        >
          <svg width="320" height="320" viewBox="0 0 320 320">
            {/* Outer golden ring */}
            <circle
              cx="160"
              cy="160"
              r="155"
              fill="url(#ringGradient)"
              stroke="#8b6820"
              strokeWidth="4"
            />

            {/* Digital symbols around the ring */}
            <DigitalSymbols active={isPowered} />

            {/* Black ring with circuit pattern */}
            <circle
              cx="160"
              cy="160"
              r="125"
              fill="#1a1a1a"
              stroke="#000"
              strokeWidth="3"
            />

            {/* Circuit pattern inside black ring */}
            <g opacity="0.9" stroke="#fff" strokeWidth="2.5" fill="none">
              {/* Geometric circuit patterns */}
              <path d="M 90,80 L 110,80 L 110,100 L 90,100 Z" />
              <path d="M 210,80 L 230,80 L 230,100 L 210,100 Z" />
              <path d="M 90,220 L 110,220 L 110,240 L 90,240 Z" />
              <path d="M 210,220 L 230,220 L 230,240 L 210,240 Z" />

              <rect x="50" y="135" width="20" height="50" rx="3" />
              <rect x="250" y="135" width="20" height="50" rx="3" />
              <rect x="135" y="50" width="50" height="20" rx="3" />
              <rect x="135" y="250" width="50" height="20" rx="3" />

              <path d="M 70,90 L 90,90 M 70,230 L 90,230 M 230,90 L 250,90 M 230,230 L 250,230" />
              <path d="M 90,70 L 90,90 M 230,70 L 230,90 M 90,230 L 90,250 M 230,230 L 230,250" />

              <line x1="110" y1="90" x2="130" y2="70" />
              <line x1="210" y1="90" x2="190" y2="70" />
              <line x1="110" y1="230" x2="130" y2="250" />
              <line x1="210" y1="230" x2="190" y2="250" />

              <circle cx="100" cy="90" r="5" fill="#fff" />
              <circle cx="220" cy="90" r="5" fill="#fff" />
              <circle cx="100" cy="230" r="5" fill="#fff" />
              <circle cx="220" cy="230" r="5" fill="#fff" />

              <path d="M 60,160 L 85,160 M 235,160 L 260,160" />
              <path d="M 160,60 L 160,85 M 160,235 L 160,260" />

              <rect x="120" y="100" width="15" height="15" rx="2" />
              <rect x="185" y="100" width="15" height="15" rx="2" />
              <rect x="120" y="205" width="15" height="15" rx="2" />
              <rect x="185" y="205" width="15" height="15" rx="2" />
            </g>
          </svg>

          {/* LCD Screen */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '180px',
              height: '145px',
              borderRadius: '12px',
              backgroundColor: !isPowered ? '#6b7c6b' : '#8b9d8b',
              boxShadow: isPowered
                ? 'inset 0 0 20px rgba(100, 120, 100, 0.3), inset 0 3px 8px rgba(0,0,0,0.6), 0 0 15px rgba(139, 157, 139, 0.4)'
                : 'inset 0 3px 8px rgba(0,0,0,0.8)',
              border: '3px solid #3a4a3a',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              zIndex: 20
            }}
          >
            {/* RENDERIZADO CONDICIONAL DE VISTAS */}
            {isPowered && !evolutionState.isEvolving && currentView === 'menu' && (
              <GoldenScreen
                selectedIndex={selectedIndex}
                digimonList={digimonList}
                mode="menu"
              />
            )}

            {isPowered && !evolutionState.isEvolving && currentView === 'detail' && (
              <GoldenScreen
                selectedIndex={detailIndex}
                digimonList={digimonList}
                mode="detail"
              />
            )}

            {isPowered && !evolutionState.isEvolving && currentView === 'evolution' && (
              <EvolutionScreen
                selectedDigimon={selectedDigimon}
                onEvolve={(from, to) => handleEvolutionTrigger(from, to)}
              />
            )}

            {/* EFECTO DE DIGIEVOLUCIÓN SUPERPUESTO */}
            {evolutionState.isEvolving && (
              <>
                {/* HOLY LIGHT FLASH - Increased z-index to ensure visibility */}
                <div className="absolute inset-0 z-[500] bg-white animate-holy-flash pointer-events-none" />

                <div className="absolute inset-0 flex items-center justify-center bg-[#8b9d8b] z-25">
                  <div className="text-center">
                    <div className="text-[12px] font-bold text-[#ff8c00] animate-pulse drop-shadow-[0_0_8px_rgba(255,190,0,0.8)]">
                      DIGIVOLVING!
                    </div>
                    <div className="text-[8px] mt-1">
                      {evolutionState.fromDigimon} → {evolutionState.toDigimon}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* LCD Grid Pattern */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    rgba(0, 0, 0, 0.09) 0px,
                    rgba(0, 0, 0, 0.09) 2px,
                    transparent 2px,
                    transparent 4px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    rgba(0, 0, 0, 0.09) 0px,
                    rgba(0, 0, 0, 0.09) 2px,
                    transparent 2px,
                    transparent 4px
                  )
                `
              }}
            />
          </div>
        </div>

        {/* Additional decorative symbols outside the main ring */}
        <div className="absolute" style={{ top: '150px', left: '120px', fontSize: '16px', color: '#8b6820', fontWeight: 'bold' }}>
          ⚡
        </div>
        <div className="absolute" style={{ top: '380px', left: '140px', fontSize: '16px', color: '#8b6820', fontWeight: 'bold' }}>
          ◆
        </div>
      </div>
    </div>
  );
}