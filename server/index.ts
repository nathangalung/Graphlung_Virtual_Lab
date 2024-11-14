import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { register, login } from './src/controllers/auth';
import { updateGameStats, getGameStats } from './src/controllers/game';
import { authMiddleware } from './src/middleware/auth';

const app = new Hono();

// Middleware
app.use('*', cors());

// Public routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

// Protected routes
app.use('/api/game/*', authMiddleware);
app.get('/api/game/stats', getGameStats);
app.post('/api/game/stats', updateGameStats);

// Start server
const port = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});