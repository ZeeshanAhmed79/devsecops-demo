import { calculateWinner, checkDraw, SquareValue } from './gameLogic.js';
import { nanoid } from 'nanoid';

export type Game = {
  id: string;
  board: SquareValue[];
  next: 'X' | 'O';
  winner: 'X' | 'O' | 'draw' | null;
  winningLine: number[] | null;
  createdAt: string;
};

export function createGame(): Game {
  return {
    id: nanoid(8),
    board: Array(9).fill(null),
    next: 'X',
    winner: null,
    winningLine: null,
    createdAt: new Date().toISOString()
  };
}

export function makeMove(game: Game, index: number): Game {
  if (game.winner) throw new Error('Game already finished');
  if (index < 0 || index > 8) throw new Error('Invalid index');
  if (game.board[index] !== null) throw new Error('Cell already taken');

  game.board[index] = game.next;
  const win = calculateWinner(game.board);
  if (win) {
    game.winner = win.winner;
    game.winningLine = win.line;
    return game;
  }

  if (checkDraw(game.board)) {
    game.winner = 'draw';
    return game;
  }

  game.next = game.next === 'X' ? 'O' : 'X';
  return game;
}
