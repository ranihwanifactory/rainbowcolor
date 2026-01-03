
export type Color = string;

export interface LevelConfig {
  id: number;
  tubeCount: number;
  emptyTubeCount: number;
  colors: Color[];
  capacity: number;
  description: string;
}

export interface GameState {
  tubes: Color[][];
  selectedIndex: number | null;
  history: Color[][][];
  level: number;
  isWon: boolean;
  message: string;
}
