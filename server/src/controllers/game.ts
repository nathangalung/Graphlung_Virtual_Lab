import { Context } from 'hono';
import { PrismaClient } from '@prisma/client';
import { GameStatSchema } from '../types';

const prisma = new PrismaClient();

export const updateGameStats = async (c: Context) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    const { levelComplete, score, timeInSeconds } = GameStatSchema.parse(body);

    const gameStats = await prisma.gameStats.update({
      where: { userId },
      data: {
        totalPoints: { increment: score },
        [`${levelComplete}Complete`]: { increment: 1 },
        [`${levelComplete}HighScore`]: {
          set: score,
          condition: { gt: score }
        },
        [`${levelComplete}BestTime`]: {
          set: timeInSeconds,
          condition: {
            OR: [
              { equals: null },
              { gt: timeInSeconds }
            ]
          }
        }
      }
    });

    return c.json({ gameStats });
  } catch (error) {
    return c.json({ error: 'Invalid input' }, 400);
  }
};

export const getGameStats = async (c: Context) => {
  try {
    const userId = c.get('userId');

    const gameStats = await prisma.gameStats.findUnique({
      where: { userId }
    });

    return c.json({ gameStats });
  } catch (error) {
    return c.json({ error: 'Server error' }, 500);
  }
};