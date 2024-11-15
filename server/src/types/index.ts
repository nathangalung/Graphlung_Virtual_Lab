import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const GameRecordSchema = z.object({
  levelComplete: z.enum(['easy', 'medium', 'hard']),
  score: z.number(),
  timeInSeconds: z.number(),
});