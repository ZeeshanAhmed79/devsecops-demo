import express from 'express';
import cors from 'cors';
import { createGame, makeMove, Game } from './game.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const games = new Map<string, Game>();

app.post('/games', (_req, res) => {
  const g = createGame();
  games.set(g.id, g);
  res.status(201).json(g);
});

app.get('/games/:id', (req, res) => {
  const g = games.get(req.params.id);
  if (!g) return res.status(404).json({ error: 'Game not found' });
  res.json(g);
});

app.post('/games/:id/move', (req, res) => {
  const g = games.get(req.params.id);
  if (!g) return res.status(404).json({ error: 'Game not found' });
  const { index } = req.body ?? {};
  if (typeof index !== 'number') return res.status(400).json({ error: 'index (number) required' });
  try {
    makeMove(g, index);
    res.json(g);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/games', (_req, res) => {
  const list = Array.from(games.values()).map(g => ({
    id: g.id,
    createdAt: g.createdAt,
    winner: g.winner,
    next: g.next
  }));
  res.json(list);
});

app.listen(PORT, () => console.log(`Backend listening on :${PORT}`));

export default app;
