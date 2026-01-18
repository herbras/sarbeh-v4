import Phaser from 'phaser';
import { Player } from '../../types';
import type { GameState, SceneProps } from '../../types';
import { BOARD_SIZE, CELL_SIZE, BOARD_OFFSET_X, BOARD_OFFSET_Y, COLOR_HIGHLIGHT, EVENTS, COLOR_BURST } from '../../constants';
import { getHardCPUMove } from '../ai';

export default class MainScene extends Phaser.Scene {
  declare add: Phaser.GameObjects.GameObjectFactory;
  declare input: Phaser.Input.InputPlugin;
  declare game: Phaser.Game;
  declare make: Phaser.GameObjects.GameObjectCreator;
  declare cameras: Phaser.Cameras.Scene2D.CameraManager;
  declare time: Phaser.Time.Clock;
  declare tweens: Phaser.Tweens.TweenManager;

  private board: Player[][] = [];
  // Store actual sprite references to animate them individually
  private pieceSprites: (Phaser.GameObjects.Image | null)[][] = [];

  private currentPlayer: Player = Player.Black;
  private validMoves: { r: number; c: number }[] = [];

  // Groups
  private piecesGroup!: Phaser.GameObjects.Group;
  private highlightGraphics!: Phaser.GameObjects.Graphics;
  private boardGraphics!: Phaser.GameObjects.Graphics;

  private blackSpecialAvailable: boolean = true;
  private whiteSpecialAvailable: boolean = true;
  private isSpecialModeActive: boolean = false;
  private isProcessingTurn: boolean = false; // Block input during animations/CPU

  private onGameStateChange?: (state: GameState) => void;
  private onSageComment?: (comment: string) => void;

  // Sound
  private audioCtx: AudioContext | null = null;
  private wasGameOver: boolean = false;

  constructor() {
    super('MainScene');
  }

  init(data: SceneProps) {
    if (data) {
        this.onGameStateChange = data.onGameStateChange;
        this.onSageComment = data.onSageComment;
    }
    this.resetGameData();
  }

  preload() {
    this.createPixelTextures();
  }

  create() {
    // Init Audio Context (Retro Synth)
    try {
        this.audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch (e) {
        console.warn('Web Audio API not supported');
    }

    // Background
    this.boardGraphics = this.add.graphics();
    this.highlightGraphics = this.add.graphics();
    this.piecesGroup = this.add.group();

    this.drawBoardBackground();
    this.initializeBoardSprites();
    this.calculateValidMoves();
    this.drawHighlights();
    this.emitState();

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      // Resume audio context if suspended (browser policy)
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
      }
      this.handleInput(pointer.x, pointer.y);
    });

    this.game.events.on(EVENTS.TRIGGER_SPECIAL, () => this.activateSpecialMode());
    this.game.events.on(EVENTS.RESET_GAME, () => this.resetGame());
  }

  // --- Sound Generation Methods ---
  private playSound(type: 'move' | 'flip' | 'special' | 'win' | 'lose') {
      if (!this.audioCtx) return;

      const t = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === 'move') {
          // Short blip
          osc.type = 'square';
          osc.frequency.setValueAtTime(300, t);
          osc.frequency.exponentialRampToValueAtTime(600, t + 0.1);
          gain.gain.setValueAtTime(0.05, t);
          gain.gain.linearRampToValueAtTime(0, t + 0.1);
          osc.start(t);
          osc.stop(t + 0.1);
      } else if (type === 'flip') {
          // Quick zip
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(400, t);
          osc.frequency.linearRampToValueAtTime(200, t + 0.15);
          gain.gain.setValueAtTime(0.03, t);
          gain.gain.linearRampToValueAtTime(0, t + 0.15);
          osc.start(t);
          osc.stop(t + 0.15);
      } else if (type === 'special') {
          // Explosion-ish noise (approximated with low saw)
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(100, t);
          osc.frequency.exponentialRampToValueAtTime(10, t + 0.5);
          gain.gain.setValueAtTime(0.2, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
          osc.start(t);
          osc.stop(t + 0.5);
      } else if (type === 'win') {
          // Fanfare arpeggio
          this.playNote(523.25, t, 0.1); // C
          this.playNote(659.25, t + 0.1, 0.1); // E
          this.playNote(783.99, t + 0.2, 0.1); // G
          this.playNote(1046.50, t + 0.3, 0.4); // C5
      } else if (type === 'lose') {
          // Sad slide
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(400, t);
          osc.frequency.exponentialRampToValueAtTime(100, t + 0.6);
          gain.gain.setValueAtTime(0.1, t);
          gain.gain.linearRampToValueAtTime(0, t + 0.6);
          osc.start(t);
          osc.stop(t + 0.6);
      }
  }

  private playNote(freq: number, time: number, duration: number) {
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      gain.gain.setValueAtTime(0.05, time);
      gain.gain.linearRampToValueAtTime(0, time + duration);
      osc.start(time);
      osc.stop(time + duration);
  }

  private resetGameData() {
    this.board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(Player.None));

    // Initialize empty sprite grid
    this.pieceSprites = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));

    const mid = BOARD_SIZE / 2;
    this.board[mid - 1][mid - 1] = Player.White;
    this.board[mid][mid] = Player.White;
    this.board[mid - 1][mid] = Player.Black;
    this.board[mid][mid - 1] = Player.Black;

    this.currentPlayer = Player.Black;
    this.blackSpecialAvailable = true;
    this.whiteSpecialAvailable = true;
    this.isSpecialModeActive = false;
    this.isProcessingTurn = false;
    this.wasGameOver = false;
  }

  private resetGame() {
    // Clear all visuals
    this.piecesGroup.clear(true, true);

    this.resetGameData();
    this.initializeBoardSprites(); // Re-add starting pieces
    this.calculateValidMoves();
    this.drawHighlights();
    this.emitState();
  }

  private createPixelTextures() {
    const g = this.make.graphics({ x: 0, y: 0 });

    // Cell Texture
    g.fillStyle(0x2ecc71);
    g.fillRect(0, 0, CELL_SIZE, CELL_SIZE);
    // Bevel effect
    g.fillStyle(0x000000, 0.2);
    g.fillRect(0, CELL_SIZE - 4, CELL_SIZE, 4);
    g.fillRect(CELL_SIZE - 4, 0, 4, CELL_SIZE);
    g.fillStyle(0xffffff, 0.2);
    g.fillRect(0, 0, CELL_SIZE, 4);
    g.fillRect(0, 0, 4, CELL_SIZE);
    g.generateTexture('cell', CELL_SIZE, CELL_SIZE);

    // White Piece
    g.clear();
    g.fillStyle(0x000000, 0.5); // Shadow
    g.fillCircle(CELL_SIZE/2, CELL_SIZE/2 + 4, CELL_SIZE/2 - 6);
    g.fillStyle(0xffffff);
    g.fillCircle(CELL_SIZE/2, CELL_SIZE/2, CELL_SIZE/2 - 6);
    g.generateTexture('piece_white', CELL_SIZE, CELL_SIZE);

    // Black Piece
    g.clear();
    g.fillStyle(0x000000, 0.5); // Shadow
    g.fillCircle(CELL_SIZE/2, CELL_SIZE/2 + 4, CELL_SIZE/2 - 6);
    g.fillStyle(0x1a1a1a);
    g.fillCircle(CELL_SIZE/2, CELL_SIZE/2, CELL_SIZE/2 - 6);
    // Shine
    g.fillStyle(0x555555);
    g.fillCircle(CELL_SIZE/2 - 8, CELL_SIZE/2 - 8, 4);
    g.generateTexture('piece_black', CELL_SIZE, CELL_SIZE);

    // Particle Texture
    g.clear();
    g.fillStyle(0xffffff);
    g.fillRect(0, 0, 4, 4);
    g.generateTexture('particle', 4, 4);
  }

  private drawBoardBackground() {
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        const x = BOARD_OFFSET_X + c * CELL_SIZE;
        const y = BOARD_OFFSET_Y + r * CELL_SIZE;
        const tint = (r + c) % 2 === 0 ? 0xffffff : 0xdddddd;
        this.add.image(x + CELL_SIZE/2, y + CELL_SIZE/2, 'cell').setTint(tint).setDepth(0);
      }
    }
  }

  private initializeBoardSprites() {
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const player = this.board[r][c];
            if (player !== Player.None) {
                this.addPieceVisual(r, c, player, false);
            }
        }
    }
  }

  private addPieceVisual(r: number, c: number, player: Player, animate: boolean = true) {
      const x = BOARD_OFFSET_X + c * CELL_SIZE + CELL_SIZE / 2;
      const y = BOARD_OFFSET_Y + r * CELL_SIZE + CELL_SIZE / 2;
      const texture = player === Player.Black ? 'piece_black' : 'piece_white';

      const sprite = this.add.image(x, y, texture);
      this.piecesGroup.add(sprite);
      this.pieceSprites[r][c] = sprite;

      if (animate) {
          sprite.setScale(0);
          this.tweens.add({
              targets: sprite,
              scale: 1,
              duration: 400,
              ease: 'Back.out'
          });

          // Small dust particles
          this.createParticles(x, y, player === Player.Black ? 0x000000 : 0xffffff, 10);
      }
  }

  private flipPieceVisual(r: number, c: number, newPlayer: Player, delay: number) {
      const sprite = this.pieceSprites[r][c];
      if (!sprite) return;

      const newTexture = newPlayer === Player.Black ? 'piece_black' : 'piece_white';
      const originalY = sprite.y;

      // 3D Jump Flip Animation
      this.tweens.add({
          targets: sprite,
          scaleX: 0, // Flatten horizontally
          scaleY: 1.1, // Stretch vertically slightly
          y: originalY - 15, // Jump up
          duration: 200,
          delay: delay,
          ease: 'Power1',
          onComplete: () => {
              sprite.setTexture(newTexture);
              this.playSound('flip');

              // Land back down
              this.tweens.add({
                  targets: sprite,
                  scaleX: 1,
                  scaleY: 1,
                  y: originalY,
                  duration: 200,
                  ease: 'Bounce.out'
              });
          }
      });
  }

  private drawHighlights() {
    this.highlightGraphics.clear();

    // Hide highlights during CPU turn or if processing
    if (this.currentPlayer === Player.White || this.isProcessingTurn) {
        return;
    }

    this.highlightGraphics.lineStyle(2, this.isSpecialModeActive ? COLOR_BURST : COLOR_HIGHLIGHT, 0.8);

    this.validMoves.forEach(move => {
        const x = BOARD_OFFSET_X + move.c * CELL_SIZE;
        const y = BOARD_OFFSET_Y + move.r * CELL_SIZE;

        // Pulse animation for highlights
        this.highlightGraphics.strokeRect(x + 4, y + 4, CELL_SIZE - 8, CELL_SIZE - 8);

        if (this.isSpecialModeActive) {
            this.highlightGraphics.fillStyle(COLOR_BURST, 0.3);
            this.highlightGraphics.fillRect(x + 4, y + 4, CELL_SIZE - 8, CELL_SIZE - 8);
        } else {
             this.highlightGraphics.fillStyle(COLOR_HIGHLIGHT, 0.1);
             this.highlightGraphics.fillCircle(x + CELL_SIZE/2, y + CELL_SIZE/2, 4);
        }
    });
  }

  private activateSpecialMode() {
    if (this.isProcessingTurn) return;
    if (this.currentPlayer === Player.White) return; // CPU cannot be forced to use special by UI button yet

    if (this.currentPlayer === Player.Black && !this.blackSpecialAvailable) return;

    this.isSpecialModeActive = !this.isSpecialModeActive;
    this.drawHighlights();

    // Feedback
    if(this.isSpecialModeActive) {
        this.cameras.main.shake(100, 0.005);
        this.playSound('move'); // Activation sound
    }
  }

  private handleInput(x: number, y: number) {
    if (this.isProcessingTurn) return;
    if (this.currentPlayer === Player.White) return; // CPU Turn block

    if (x < BOARD_OFFSET_X || y < BOARD_OFFSET_Y) return;

    const c = Math.floor((x - BOARD_OFFSET_X) / CELL_SIZE);
    const r = Math.floor((y - BOARD_OFFSET_Y) / CELL_SIZE);

    if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
      this.attemptMove(r, c);
    }
  }

  private attemptMove(r: number, c: number) {
    const isValid = this.validMoves.some(m => m.r === r && m.c === c);

    if (isValid) {
      this.isProcessingTurn = true; // Lock input while animating/switching

      if (this.onSageComment) this.onSageComment('thinking...');

      let specialUsed = false;
      if (this.isSpecialModeActive && this.currentPlayer === Player.Black) {
        specialUsed = true;
        this.blackSpecialAvailable = false;

        this.executeMove(r, c, true);
        this.isSpecialModeActive = false;
      } else {
        // Normal move for player or CPU
        this.executeMove(r, c, false);
      }

      // Special Effects
      if (specialUsed) {
        this.cameras.main.shake(500, 0.02); // Big shake
        const x = BOARD_OFFSET_X + c * CELL_SIZE + CELL_SIZE/2;
        const y = BOARD_OFFSET_Y + r * CELL_SIZE + CELL_SIZE/2;
        this.createParticles(x, y, 0xff0000, 50, true);
        this.playSound('special');
      } else {
         this.cameras.main.shake(100, 0.002); // Tiny thud
         this.playSound('move');
      }

      // Delayed Turn Switch to allow animations to play out visually
      this.time.delayedCall(600, () => {
          this.switchTurn();
      });
    }
  }

  private switchTurn() {
      // Switch Player
      this.currentPlayer = this.currentPlayer === Player.Black ? Player.White : Player.Black;
      this.calculateValidMoves();

      // Check for Pass
      if (this.validMoves.length === 0) {
        const opponent = this.currentPlayer === Player.Black ? Player.White : Player.Black;
        // Hacky check: we don't have opponent valid moves stored, but if current player has 0 moves
        // We switch back.
        this.currentPlayer = opponent;
        this.calculateValidMoves();
      }

      this.drawHighlights();
      this.emitState();

      // If Game Over, stop
      const { black, white } = this.getScores();
      const isBoardFull = black + white === 64;
      const noMoves = this.validMoves.length === 0; // If swapped back and still 0, it's over

      if (noMoves || isBoardFull) {
         this.isProcessingTurn = false;
         return;
      }

      // If CPU Turn (White), trigger AI
      if (this.currentPlayer === Player.White) {
          this.time.delayedCall(800, () => this.performCPUTurn());
      } else {
          this.isProcessingTurn = false; // Unlock for human
      }
  }

  private performCPUTurn() {
      const bestMove = getHardCPUMove(this.board, Player.White);
      if (bestMove) {
          this.attemptMove(bestMove.r, bestMove.c);
      } else {
          // Should be handled by pass logic in switchTurn, but safeguard
          this.switchTurn();
      }
  }

  private executeMove(r: number, c: number, isSpecial: boolean) {
    // 1. Place the piece logically and visually
    this.board[r][c] = this.currentPlayer;
    this.addPieceVisual(r, c, this.currentPlayer, true);

    // 2. Identify all flips (Logic)
    const piecesToFlip: { r: number, c: number }[] = [];

    if (isSpecial) {
      // Special: 3x3 Blast
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          // Skip the center (we just placed it)
          if (nr === r && nc === c) continue;

          if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
            if (this.board[nr][nc] !== Player.None && this.board[nr][nc] !== this.currentPlayer) {
               piecesToFlip.push({ r: nr, c: nc });
            }
          }
        }
      }
    } else {
      // Normal Othello Rules
      const directions = [
        { dr: -1, dc: 0 }, { dr: 1, dc: 0 }, { dr: 0, dc: -1 }, { dr: 0, dc: 1 },
        { dr: -1, dc: -1 }, { dr: -1, dc: 1 }, { dr: 1, dc: -1 }, { dr: 1, dc: 1 }
      ];

      for (const { dr, dc } of directions) {
        let rCurrent = r + dr;
        let cCurrent = c + dc;
        const potentialFlips: { r: number, c: number }[] = [];

        while (
          rCurrent >= 0 && rCurrent < BOARD_SIZE &&
          cCurrent >= 0 && cCurrent < BOARD_SIZE &&
          this.board[rCurrent][cCurrent] !== Player.None &&
          this.board[rCurrent][cCurrent] !== this.currentPlayer
        ) {
          potentialFlips.push({ r: rCurrent, c: cCurrent });
          rCurrent += dr;
          cCurrent += dc;
        }

        if (
          rCurrent >= 0 && rCurrent < BOARD_SIZE &&
          cCurrent >= 0 && cCurrent < BOARD_SIZE &&
          this.board[rCurrent][cCurrent] === this.currentPlayer &&
          potentialFlips.length > 0
        ) {
          piecesToFlip.push(...potentialFlips);
        }
      }
    }

    // 3. Execute Flips (Logic + Visuals)
    let delay = 100; // Start delay after placement
    // Sort flips by distance from center for a ripple effect
    piecesToFlip.sort((a, b) => {
        const distA = Math.abs(a.r - r) + Math.abs(a.c - c);
        const distB = Math.abs(b.r - r) + Math.abs(b.c - c);
        return distA - distB;
    });

    for (const p of piecesToFlip) {
      this.board[p.r][p.c] = this.currentPlayer;
      this.flipPieceVisual(p.r, p.c, this.currentPlayer, delay);
      delay += 80; // Ripple delay
    }
  }

  private createParticles(x: number, y: number, color: number, count: number, explosion: boolean = false) {
      const particles = this.add.particles(x, y, 'particle', {
          speed: explosion ? { min: 100, max: 300 } : { min: 20, max: 60 },
          angle: { min: 0, max: 360 },
          scale: { start: explosion ? 2 : 1, end: 0 },
          alpha: { start: 1, end: 0 },
          lifespan: explosion ? 800 : 400,
          tint: color,
          quantity: count,
          blendMode: 'ADD'
      });

      this.time.delayedCall(1000, () => particles.destroy());
  }

  private calculateValidMoves() {
    this.validMoves = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (this.isValidMove(r, c)) {
          this.validMoves.push({ r, c });
        }
      }
    }
  }

  private isValidMove(r: number, c: number): boolean {
    if (this.board[r][c] !== Player.None) return false;
    const opponent = this.currentPlayer === Player.Black ? Player.White : Player.Black;
    const directions = [
      { dr: -1, dc: 0 }, { dr: 1, dc: 0 }, { dr: 0, dc: -1 }, { dr: 0, dc: 1 },
      { dr: -1, dc: -1 }, { dr: -1, dc: 1 }, { dr: 1, dc: -1 }, { dr: 1, dc: 1 }
    ];

    for (const { dr, dc } of directions) {
      let rCurrent = r + dr;
      let cCurrent = c + dc;
      let hasOpponentBetween = false;

      while (
        rCurrent >= 0 && rCurrent < BOARD_SIZE &&
        cCurrent >= 0 && cCurrent < BOARD_SIZE &&
        this.board[rCurrent][cCurrent] === opponent
      ) {
        hasOpponentBetween = true;
        rCurrent += dr;
        cCurrent += dc;
      }

      if (
        hasOpponentBetween &&
        rCurrent >= 0 && rCurrent < BOARD_SIZE &&
        cCurrent >= 0 && cCurrent < BOARD_SIZE &&
        this.board[rCurrent][cCurrent] === this.currentPlayer
      ) {
        return true;
      }
    }
    return false;
  }

  private getScores() {
    let black = 0;
    let white = 0;
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (this.board[r][c] === Player.Black) black++;
        else if (this.board[r][c] === Player.White) white++;
      }
    }
    return { black, white };
  }

  private emitState() {
    const { black, white } = this.getScores();
    const noMoves = this.validMoves.length === 0;

    let gameOver = false;
    if (noMoves) {
        if (black + white === 64) gameOver = true;
    }

    // Check winner
    let winner: Player | 'Draw' | null = null;
    if (gameOver || (noMoves && this.isProcessingTurn === false)) {
         if (black + white === 64) {
             gameOver = true;
         }
    }

    if (gameOver) {
        if (black > white) winner = Player.Black;
        else if (white > black) winner = Player.White;
        else winner = 'Draw';

        // Play game over sound only once
        if (!this.wasGameOver) {
            this.wasGameOver = true;
            if (winner === Player.Black) this.playSound('win');
            else this.playSound('lose');
        }
    }

    if (this.onGameStateChange) {
      this.onGameStateChange({
        currentPlayer: this.currentPlayer,
        blackScore: black,
        whiteScore: white,
        gameOver,
        winner,
        blackSpecialAvailable: this.blackSpecialAvailable,
        whiteSpecialAvailable: this.whiteSpecialAvailable
      });
    }
  }
}
