import { Player } from "../types";
import { BOARD_SIZE } from "../constants";

// Weight matrix for 8x8 Othello
// High positive = Good (Corners)
// High negative = Bad (Near corners usually)
const POSITIONAL_WEIGHTS = [
    [100, -20, 10, 5, 5, 10, -20, 100],
    [-20, -50, -2, -2, -2, -2, -50, -20],
    [10, -2, -1, -1, -1, -1, -2, 10],
    [5, -2, -1, -1, -1, -1, -2, 5],
    [5, -2, -1, -1, -1, -1, -2, 5],
    [10, -2, -1, -1, -1, -1, -2, 10],
    [-20, -50, -2, -2, -2, -2, -50, -20],
    [100, -20, 10, 5, 5, 10, -20, 100]
];

type Move = { r: number; c: number };

// Helper: Check if a move is valid (Pure logic version of MainScene.isValidMove)
function getValidMoves(board: Player[][], player: Player): Move[] {
    const validMoves: Move[] = [];
    const opponent = player === Player.Black ? Player.White : Player.Black;
    const directions = [
        { dr: -1, dc: 0 }, { dr: 1, dc: 0 }, { dr: 0, dc: -1 }, { dr: 0, dc: 1 },
        { dr: -1, dc: -1 }, { dr: -1, dc: 1 }, { dr: 1, dc: -1 }, { dr: 1, dc: 1 }
    ];

    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            if (board[r][c] !== Player.None) continue;

            let isValid = false;
            for (const { dr, dc } of directions) {
                let rCurrent = r + dr;
                let cCurrent = c + dc;
                let hasOpponentBetween = false;

                while (
                    rCurrent >= 0 && rCurrent < BOARD_SIZE &&
                    cCurrent >= 0 && cCurrent < BOARD_SIZE &&
                    board[rCurrent][cCurrent] === opponent
                ) {
                    hasOpponentBetween = true;
                    rCurrent += dr;
                    cCurrent += dc;
                }

                if (
                    hasOpponentBetween &&
                    rCurrent >= 0 && rCurrent < BOARD_SIZE &&
                    cCurrent >= 0 && cCurrent < BOARD_SIZE &&
                    board[rCurrent][cCurrent] === player
                ) {
                    isValid = true;
                    break;
                }
            }

            if (isValid) {
                validMoves.push({ r, c });
            }
        }
    }
    return validMoves;
}

// Helper: Execute a move on a cloned board
function simulateMove(board: Player[][], move: Move, player: Player): Player[][] {
    const newBoard = board.map(row => [...row]); // Deep copy rows
    newBoard[move.r][move.c] = player;
    
    const opponent = player === Player.Black ? Player.White : Player.Black;
    const directions = [
        { dr: -1, dc: 0 }, { dr: 1, dc: 0 }, { dr: 0, dc: -1 }, { dr: 0, dc: 1 },
        { dr: -1, dc: -1 }, { dr: -1, dc: 1 }, { dr: 1, dc: -1 }, { dr: 1, dc: 1 }
    ];

    for (const { dr, dc } of directions) {
        let rCurrent = move.r + dr;
        let cCurrent = move.c + dc;
        const potentialFlips: Move[] = [];

        while (
            rCurrent >= 0 && rCurrent < BOARD_SIZE &&
            cCurrent >= 0 && cCurrent < BOARD_SIZE &&
            newBoard[rCurrent][cCurrent] === opponent
        ) {
            potentialFlips.push({ r: rCurrent, c: cCurrent });
            rCurrent += dr;
            cCurrent += dc;
        }

        if (
            rCurrent >= 0 && rCurrent < BOARD_SIZE &&
            cCurrent >= 0 && cCurrent < BOARD_SIZE &&
            newBoard[rCurrent][cCurrent] === player &&
            potentialFlips.length > 0
        ) {
            for (const p of potentialFlips) {
                newBoard[p.r][p.c] = player;
            }
        }
    }
    return newBoard;
}

function evaluateBoard(board: Player[][], player: Player): number {
    let score = 0;
    const opponent = player === Player.Black ? Player.White : Player.Black;

    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            if (board[r][c] === player) {
                score += POSITIONAL_WEIGHTS[r][c];
            } else if (board[r][c] === opponent) {
                score -= POSITIONAL_WEIGHTS[r][c];
            }
        }
    }
    return score;
}

function minimax(
    board: Player[][], 
    depth: number, 
    alpha: number, 
    beta: number, 
    maximizingPlayer: boolean,
    player: Player
): { score: number, move: Move | null } {
    const validMoves = getValidMoves(board, maximizingPlayer ? player : (player === Player.Black ? Player.White : Player.Black));

    if (depth === 0 || validMoves.length === 0) {
        // Simple evaluation if terminal node or no moves
        // If no moves, it might be game over, but for simple minimax just eval current state
        return { score: evaluateBoard(board, player), move: null };
    }

    if (maximizingPlayer) {
        let maxEval = -Infinity;
        let bestMove: Move | null = validMoves[0]; // Default to first valid

        for (const move of validMoves) {
            const nextBoard = simulateMove(board, move, player);
            const evalResult = minimax(nextBoard, depth - 1, alpha, beta, false, player);
            
            if (evalResult.score > maxEval) {
                maxEval = evalResult.score;
                bestMove = move;
            }
            alpha = Math.max(alpha, evalResult.score);
            if (beta <= alpha) break; // Prune
        }
        return { score: maxEval, move: bestMove };
    } else {
        let minEval = Infinity;
        let bestMove: Move | null = validMoves[0];
        const opponent = player === Player.Black ? Player.White : Player.Black;

        for (const move of validMoves) {
            const nextBoard = simulateMove(board, move, opponent);
            const evalResult = minimax(nextBoard, depth - 1, alpha, beta, true, player);
            
            if (evalResult.score < minEval) {
                minEval = evalResult.score;
                bestMove = move;
            }
            beta = Math.min(beta, evalResult.score);
            if (beta <= alpha) break; // Prune
        }
        return { score: minEval, move: bestMove };
    }
}

export const getHardCPUMove = (board: Player[][], cpuPlayer: Player): Move | null => {
    // Depth 3 is decent for realtime JS without blocking UI too long. 
    // Depth 4 is harder but might lag slightly on mobile.
    // Let's use 3 + strict positional weights which is "Hard" enough for casual play.
    const result = minimax(board, 3, -Infinity, Infinity, true, cpuPlayer);
    return result.move;
};