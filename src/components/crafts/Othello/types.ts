export enum Player {
  None = 0,
  Black = 1,
  White = 2,
}

export type Language = "en" | "id";

export type GameState = {
  currentPlayer: Player;
  blackScore: number;
  whiteScore: number;
  gameOver: boolean;
  blackSpecialAvailable: boolean;
  whiteSpecialAvailable: boolean;
  winner: Player | "Draw" | null;
};

export type GameEventCallback = (state: GameState) => void;

export type SceneProps = {
  onGameStateChange: GameEventCallback;
  onSageComment: (comment: string) => void;
};
