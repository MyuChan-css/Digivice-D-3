import { motion } from 'framer-motion';

interface ActionButtonsProps {
  isActive: boolean;
  onButtonA?: () => void;
  onButtonB?: () => void;
}

export function ActionButtons({ isActive, onButtonA, onButtonB }: ActionButtonsProps) {
  return (
    <div className="flex flex-col gap-4 items-end absolute bottom-[80px] right-[30px]">
      {/* BOTÓN A - Superior (Mover flecha abajo) */}
      <motion.button
        onClick={onButtonA}
        disabled={!isActive}
        whileTap={isActive ? { scale: 0.9 } : {}}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#3b82f6', // AZUL
          border: '3px solid #1e40af',
          cursor: isActive ? 'pointer' : 'default',
          opacity: isActive ? 1 : 0.5,
          fontFamily: 'Press Start 2P',
          fontSize: '10px',
          color: '#fff'
        }}
      >
        A
      </motion.button>

      {/* BOTÓN B - Inferior (Confirmar) */}
      <motion.button
        onClick={onButtonB}
        disabled={!isActive}
        whileTap={isActive ? { scale: 0.9 } : {}}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#3b82f6', // AZUL
          border: '3px solid #1e40af',
          cursor: isActive ? 'pointer' : 'default',
          opacity: isActive ? 1 : 0.5,
          fontFamily: 'Press Start 2P',
          fontSize: '10px',
          color: '#fff'
        }}
      >
        B
      </motion.button>
    </div>
  );
}