import { Context } from 'hono';
import prisma from './prisma';
import { PrismaClient } from '@prisma/client';
import { GameRecordSchema } from '../types';

const prisma = new PrismaClient();

export const updateGameRecords = async (c: Context) => {
  try {
    console.log('Update game records endpoint hit');
    const userId = c.get('userId');
    const body = await c.req.json();
    console.log('Request body:', body);
    const { levelComplete, score, timeInSeconds } = GameRecordSchema.parse(body);

    const gameRecords = await prisma.gameRecords.upsert({
      where: { userId },
      update: {
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
      },
      create: {
        userId,
        totalPoints: score,
        [`${levelComplete}Complete`]: 1,
        [`${levelComplete}HighScore`]: score,
        [`${levelComplete}BestTime`]: timeInSeconds
      }
    });

    console.log('Game records updated successfully:', gameRecords);
    return c.json({ gameRecords });
  } catch (error) {
    console.error('Error in update game records endpoint:', error);
    return c.json({ error: 'Invalid input' }, 400);
  }
};

export const getGameRecords = async (c: Context) => {
  try {
    console.log('Get game records endpoint hit');
    const userId = c.get('userId');

    const gameRecords = await prisma.gameRecords.findUnique({
      where: { userId }
    });

    console.log('Game records retrieved successfully:', gameRecords);
    return c.json({ gameRecords });
  } catch (error) {
    console.error('Error in get game records endpoint:', error);
    return c.json({ error: 'Server error' }, 500);
  }
};