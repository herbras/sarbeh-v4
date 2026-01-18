export enum Player {
  None = 0,
  Black = 1,
  White = 2,
}

export type Language = 'en' | 'id';

export interface GameState {
  currentPlayer: Player;
  blackScore: number;
  whiteScore: number;
  gameOver: boolean;
  blackSpecialAvailable: boolean;
  whiteSpecialAvailable: boolean;
  winner: Player | 'Draw' | null;
}

// Events emitted from Phaser to React
export type GameEventCallback = (state: GameState) => void;

export interface SceneProps {
  onGameStateChange: GameEventCallback;
  onSageComment: (comment: string) => void;
}