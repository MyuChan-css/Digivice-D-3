import { useState } from 'react';
import { digimonDatabase, getPossibleEvolutions } from '../data/digimons';

interface EvolutionState {
  isEvolving: boolean;
  fromDigimon: string | null;
  toDigimon: string | null;
  evolutionStage: number;
}

export const useDigiviceActions = (isPowered: boolean) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentView, setCurrentView] = useState<'menu' | 'detail' | 'evolution'>('menu');
  const [selectedDigimon, setSelectedDigimon] = useState('Koromon');
  const [evolutionState, setEvolutionState] = useState<EvolutionState>({
    isEvolving: false,
    fromDigimon: null,
    toDigimon: null,
    evolutionStage: 0
  });

  // ✅ LISTA COMPLETA DE DIGIMONS
  const digimonList = digimonDatabase.map(d => d.name);

  // 🔥 BOTÓN A: NAVEGACIÓN / MOSTRAR EVOLUCIONES
  const handleButtonA = () => {
    if (!isPowered) return;

    if (currentView === 'menu') {
      const newIndex = (selectedIndex + 1) % digimonList.length;
      setSelectedIndex(newIndex);
      setSelectedDigimon(digimonList[newIndex]);
    } else if (currentView === 'detail') {
      const evolutions = getPossibleEvolutions(selectedDigimon);
      if (evolutions.length > 0) {
        setCurrentView('evolution');
      }
    }
  };

  // 🔥 BOTÓN B: CONFIRMAR / VOLVER
  const handleButtonB = () => {
    if (!isPowered) return;

    if (currentView === 'menu') {
      setCurrentView('detail');
    } else if (currentView === 'detail') {
      setCurrentView('menu');
    } else if (currentView === 'evolution') {
      setCurrentView('detail');
    }
  };

  // 🔥 FINALIZAR EVOLUCIÓN (MANUAL O AUTOMÁTICA)
  const finishEvolution = (overrideToDigimon?: string) => {
    const toName = overrideToDigimon || evolutionState.toDigimon;

    if (!toName) return;

    setSelectedDigimon(toName);
    setSelectedIndex(digimonList.indexOf(toName));
    setEvolutionState({ isEvolving: false, fromDigimon: null, toDigimon: null, evolutionStage: 0 });
    setCurrentView('detail');
  };

  // 🔥 DIGIEVOLUCIÓN ANIMADA
  const triggerEvolution = (fromName: string, toName: string, durationMs: number = 2400, autoFinish: boolean = true) => {
    if (!isPowered) return;

    console.log(`⚡ DIGIEVOLVIENDO: ${fromName} → ${toName} (${durationMs}ms, autoFinish: ${autoFinish})`);

    setEvolutionState({
      isEvolving: true,
      fromDigimon: fromName,
      toDigimon: toName,
      evolutionStage: 1
    });

    // Secuencia de animación (stages)
    setTimeout(() => setEvolutionState(prev => ({ ...prev, evolutionStage: 2 })), 800);
    setTimeout(() => setEvolutionState(prev => ({ ...prev, evolutionStage: 3 })), 1600);

    if (autoFinish) {
      setTimeout(() => {
        finishEvolution();
      }, durationMs);
    }
  };

  return {
    selectedIndex,
    currentView,
    digimonList,
    selectedDigimon,
    evolutionState,
    triggerEvolution,
    finishEvolution,
    handleButtonA,
    handleButtonB
  };
};