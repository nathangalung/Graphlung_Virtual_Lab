import { Context, Next } from 'hono';
import { verifyToken } from '../utils/token';

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    console.error('Unauthorized: Missing or invalid Authorization header');
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    c.set('userId', decoded.userId);
    await next();
  } catch (error) {
    console.error('Invalid token:', error);
    return c.json({ error: 'Invalid token' }, 401);
  }
};