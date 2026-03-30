import { useState, useEffect } from 'react';

export const useDigivicePower = () => {
  const [isPowered, setIsPowered] = useState(false);
  const [screenState, setScreenState] = useState<'off' | 'boot' | 'menu'>('off');

  const togglePower = () => {
    setIsPowered(prev => !prev);
  };

  useEffect(() => {
    if (isPowered) {
      setScreenState('boot');
      const timer = setTimeout(() => setScreenState('menu'), 2000);
      return () => clearTimeout(timer);
    } else {
      setScreenState('off');
    }
  }, [isPowered]);

  return { isPowered, togglePower, screenState };
};