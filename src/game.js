// src/game.js
const WINNING_LINES = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6]          // diags
];

function createGame(playerX = 'X', playerO = 'O') {
  return {
    id: null,
    board: Array(9).fill(null),
    next: 'X',
    winner: null,
    moves: 0,
    players: { X: playerX, O: playerO },
    createdAt: new Date().toISOString()
  };
}

function makeMove(game, index) {
  if (!game) throw new Error('Game not found');
  if (game.winner) throw new Error('Game already finished');
  if (index < 0 || index > 8) throw new Error('Invalid index');
  if (game.board[index] !== null) throw new Error('Cell already taken');

  game.board[index] = game.next;
  game.moves += 1;

  // check winner
  for (const line of WINNING_LINES) {
    const [a,b,c] = line;
    if (game.board[a] && game.board[a] === game.board[b] && game.board[a] === game.board[c]) {
      game.winner = game.board[a];
      return game;
    }
  }

  // draw?
  if (game.moves >= 9) {
    game.winner = 'draw';
    return game;
  }

  // switch
  game.next = game.next === 'X' ? 'O' : 'X';
  return game;
}

module.exports = { createGame, makeMove };
