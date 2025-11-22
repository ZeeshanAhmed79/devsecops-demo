// src/index.js
const express = require('express');
const { nanoid } = require('nanoid');
const { createGame, makeMove } = require('./game');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// in-memory store
const games = new Map();

/**
 * Create a new game
 * POST /games
 * body: { playerX?: string, playerO?: string }
 */
app.post('/games', (req, res) => {
  const { playerX, playerO } = req.body || {};
  const game = createGame(playerX || 'X', playerO || 'O');
  game.id = nanoid(8);
  games.set(game.id, game);
  res.status(201).json(game);
});

/**
 * Get game state
 * GET /games/:id
 */
app.get('/games/:id', (req, res) => {
  const game = games.get(req.params.id);
  if (!game) return res.status(404).json({ error: 'Game not found' });
  res.json(game);
});

/**
 * Make a move
 * POST /games/:id/move
 * body: { index: number }
 */
app.post('/games/:id/move', (req, res) => {
  try {
    const game = games.get(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    const { index } = req.body ?? {};
    if (typeof index !== 'number') return res.status(400).json({ error: 'index (number) required' });
    makeMove(game, index);
    res.json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * List games (brief)
 * GET /games
 */
app.get('/games', (req, res) => {
  const list = Array.from(games.values()).map(g => ({
    id: g.id,
    createdAt: g.createdAt,
    winner: g.winner,
    next: g.next
  }));
  res.json(list);
});

app.listen(PORT, () => {
  console.log(`TicTacToe backend listening on :${PORT}`);
});

module.exports = app; // for tests
