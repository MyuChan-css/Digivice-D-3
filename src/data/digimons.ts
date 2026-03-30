export interface DigimonData {
  name: string;
  stage: 'Baby' | 'In-Training' | 'Rookie' | 'Champion' | 'Ultimate' | 'Mega';
  type: string;
  attribute: string;
  evolutions: string[];
  prevolution: string | null;
  stats: {
    hp: number;
    attack: number;
    defense: number;
  };
}

// 🔥 51 DIGIMONS CON LÍNEAS EVOLUTIVAS REALES
export const digimonDatabase: DigimonData[] = [
  // LÍNEA DE AGUMON
  { name: 'Botamon', stage: 'Baby', type: 'Slime', attribute: 'Data', evolutions: ['Koromon'], prevolution: null, stats: { hp: 20, attack: 5, defense: 5 } },
  { name: 'Koromon', stage: 'In-Training', type: 'Lesser', attribute: 'Data', evolutions: ['Agumon'], prevolution: 'Botamon', stats: { hp: 40, attack: 15, defense: 10 } },
  { name: 'Agumon', stage: 'Rookie', type: 'Reptile', attribute: 'Vaccine', evolutions: ['Greymon'], prevolution: 'Koromon', stats: { hp: 80, attack: 45, defense: 30 } },
  { name: 'Greymon', stage: 'Champion', type: 'Dinosaur', attribute: 'Vaccine', evolutions: ['MetalGreymon'], prevolution: 'Agumon', stats: { hp: 120, attack: 75, defense: 50 } },
  { name: 'MetalGreymon', stage: 'Ultimate', type: 'Cyborg', attribute: 'Vaccine', evolutions: ['WarGreymon'], prevolution: 'Greymon', stats: { hp: 160, attack: 105, defense: 80 } },
  { name: 'WarGreymon', stage: 'Mega', type: 'Dragon', attribute: 'Vaccine', evolutions: [], prevolution: 'MetalGreymon', stats: { hp: 200, attack: 135, defense: 110 } },

  // LÍNEA DE GABUMON
  { name: 'Punimon', stage: 'Baby', type: 'Slime', attribute: 'Data', evolutions: ['Tsunomon'], prevolution: null, stats: { hp: 20, attack: 5, defense: 5 } },
  { name: 'Tsunomon', stage: 'In-Training', type: 'Lesser', attribute: 'Data', evolutions: ['Gabumon'], prevolution: 'Punimon', stats: { hp: 40, attack: 15, defense: 10 } },
  { name: 'Gabumon', stage: 'Rookie', type: 'Reptile', attribute: 'Vaccine', evolutions: ['Garurumon'], prevolution: 'Tsunomon', stats: { hp: 80, attack: 43, defense: 32 } },
  { name: 'Garurumon', stage: 'Champion', type: 'Beast', attribute: 'Vaccine', evolutions: ['WereGarurumon'], prevolution: 'Gabumon', stats: { hp: 120, attack: 73, defense: 52 } },
  { name: 'WereGarurumon', stage: 'Ultimate', type: 'Beast Man', attribute: 'Vaccine', evolutions: ['MetalGarurumon'], prevolution: 'Garurumon', stats: { hp: 160, attack: 103, defense: 82 } },
  { name: 'MetalGarurumon', stage: 'Mega', type: 'Cyborg', attribute: 'Vaccine', evolutions: [], prevolution: 'WereGarurumon', stats: { hp: 200, attack: 133, defense: 112 } },

  // OTROS DIGIMONS
  { name: 'Biyomon', stage: 'Rookie', type: 'Bird', attribute: 'Vaccine', evolutions: ['Birdramon'], prevolution: 'Yokomon', stats: { hp: 75, attack: 40, defense: 28 } },
  { name: 'Birdramon', stage: 'Champion', type: 'Bird', attribute: 'Vaccine', evolutions: [], prevolution: 'Biyomon', stats: { hp: 115, attack: 70, defense: 48 } },
  { name: 'Tentomon', stage: 'Rookie', type: 'Insect', attribute: 'Vaccine', evolutions: ['Kabuterimon'], prevolution: 'Motimon', stats: { hp: 78, attack: 42, defense: 35 } },
  { name: 'Kabuterimon', stage: 'Champion', type: 'Insect', attribute: 'Vaccine', evolutions: [], prevolution: 'Tentomon', stats: { hp: 118, attack: 72, defense: 55 } },
  { name: 'Palmon', stage: 'Rookie', type: 'Plant', attribute: 'Data', evolutions: ['Togemon'], prevolution: 'Tanemon', stats: { hp: 72, attack: 38, defense: 25 } },
  { name: 'Togemon', stage: 'Champion', type: 'Plant', attribute: 'Data', evolutions: [], prevolution: 'Palmon', stats: { hp: 112, attack: 68, defense: 45 } },
  { name: 'Patamon', stage: 'Rookie', type: 'Mammal', attribute: 'Data', evolutions: ['Angemon'], prevolution: 'Tokomon', stats: { hp: 70, attack: 38, defense: 25 } },
  { name: 'Angemon', stage: 'Champion', type: 'Angel', attribute: 'Vaccine', evolutions: [], prevolution: 'Patamon', stats: { hp: 110, attack: 68, defense: 45 } },
];

export const getDigimonByName = (name: string) => digimonDatabase.find(d => d.name === name);
export const getEvolutionLine = (name: string) => {
  const digimon = getDigimonByName(name);
  if (!digimon) return [];
  const line = [];
  let current = digimon;
  while (current?.prevolution) {
    const prev = getDigimonByName(current.prevolution);
    if (prev) current = prev;
    else break;
  }
  line.push(current);
  while (current?.evolutions?.length > 0) {
    const next = getDigimonByName(current.evolutions[0]);
    if (next) {
      line.push(next);
      current = next;
    } else break;
  }
  return line;
};
export const getPossibleEvolutions = (name: string) => getDigimonByName(name)?.evolutions || [];